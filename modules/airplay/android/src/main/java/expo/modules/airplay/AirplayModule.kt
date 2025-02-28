package com.andromed.modules.airplay

import expo.modules.kotlin.modules.Module
import expo.modules.kotlin.modules.ModuleDefinition
import com.google.android.gms.cast.framework.CastContext
import com.google.android.gms.cast.framework.CastState
import com.google.android.gms.cast.framework.CastStateListener
import android.content.Context

class AirplayModule : Module() {
  private lateinit var castContext: CastContext
  private var castStateListener: CastStateListener? = null

  override fun definition() = ModuleDefinition {
    Name("Airplay")

    Events("onChromecastStateChange")

    OnCreate {
      castContext = CastContext.getSharedInstance(context.applicationContext)
      castStateListener = CastStateListener { state ->
        sendEvent("onChromecastStateChange", mapOf(
          "available" to (state != CastState.NO_DEVICES_AVAILABLE)
        ))
      }
      castContext.addCastStateListener(castStateListener!!)
    }

    Function("isChromecastAvailable") {
      val state = castContext.castState
      state != CastState.NO_DEVICES_AVAILABLE
    }

    AsyncFunction("showChromecastPicker") {
      castContext.sessionManager.startSession()
    }

    AsyncFunction("startChromecast") { mediaUrl: String ->
      val remoteMediaClient = castContext.sessionManager.currentCastSession?.remoteMediaClient
      if (remoteMediaClient != null) {
        val mediaInfo = MediaInfo.Builder(mediaUrl)
          .setContentType("video/mp4")
          .build()
        remoteMediaClient.load(MediaLoadRequestData.Builder().setMediaInfo(mediaInfo).build())
      }
    }

    AsyncFunction("stopChromecast") {
      castContext.sessionManager.endCurrentSession(true)
    }

    OnDestroy {
      castStateListener?.let {
        castContext.removeCastStateListener(it)
      }
    }
  }
}
