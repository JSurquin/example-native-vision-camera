import ExpoModulesCore
import AVKit
import MediaPlayer

public class AirplayModule: Module {
  private var airplayController: AVRoutePickerView?
  
  public func definition() -> ModuleDefinition {
    Name("Airplay")
    
    Function("isAirplayAvailable") { () -> Bool in
      return AVAudioSession.sharedInstance().currentRoute.outputs.contains { 
        $0.portType == AVAudioSession.Port.airPlay
      }
    }
    
    AsyncFunction("showAirplayPicker") { () in
      DispatchQueue.main.async {
        if self.airplayController == nil {
          self.airplayController = AVRoutePickerView(frame: CGRect(x: 0, y: 0, width: 44, height: 44))
        }
        
        if let window = UIApplication.shared.keyWindow {
          self.airplayController?.center = window.center
          window.addSubview(self.airplayController!)
        }
      }
    }
    
    AsyncFunction("startAirplay") { () in
      try AVAudioSession.sharedInstance().setCategory(.playback, mode: .default)
      try AVAudioSession.sharedInstance().setActive(true)
    }
    
    AsyncFunction("stopAirplay") { () in
      try AVAudioSession.sharedInstance().setActive(false)
      self.airplayController?.removeFromSuperview()
      self.airplayController = nil
    }
    
    Events("onAirplayStateChange")
    
    OnCreate {
      NotificationCenter.default.addObserver(self,
        selector: #selector(self.handleRouteChange),
        name: AVAudioSession.routeChangeNotification,
        object: nil)
    }
  }
  
  @objc private func handleRouteChange(notification: Notification) {
    guard let userInfo = notification.userInfo,
          let reasonValue = userInfo[AVAudioSessionRouteChangeReasonKey] as? UInt,
          let reason = AVAudioSession.RouteChangeReason(rawValue: reasonValue) else {
      return
    }
    
    self.sendEvent("onAirplayStateChange", [
      "isAirplaying": AVAudioSession.sharedInstance().currentRoute.outputs.contains { 
        $0.portType == AVAudioSession.Port.airPlay
      }
    ])
  }
}
