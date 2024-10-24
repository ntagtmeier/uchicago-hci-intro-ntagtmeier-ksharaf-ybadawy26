package com.example.vibrationintensityapp;

import android.os.Bundle;
import android.os.VibrationEffect;
import android.os.Vibrator;
import android.app.Activity;
import android.content.Intent;
import android.content.BroadcastReceiver;
import android.content.Context;
import android.content.IntentFilter;

public class MainActivity extends Activity {

    private Vibrator vibrator;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        vibrator = (Vibrator) getSystemService(VIBRATOR_SERVICE);
        IntentFilter filter = new IntentFilter("com.example.VIBRATE_COMMAND");
        registerReceiver(vibrationReceiver, filter);
    }
    private BroadcastReceiver vibrationReceiver = new BroadcastReceiver() {
        @Override
        public void onReceive(Context context, Intent intent) {
            String emoticon = intent.getStringExtra("emoticon");
            triggerVibration(emoticon);
        }
    };

    private void triggerVibration(String emoticon) {
        VibrationEffect effect;

        switch (emoticon) {
            case "like":
                effect = VibrationEffect.createWaveform(
                        new long[]{100, 100, 100, 100},
                        new int[]{200, 255, 200, 255},
                        -1);
                break;

            case "love":
                effect = VibrationEffect.createWaveform(
                        new long[]{400, 200, 400},
                        new int[]{150, 255, 150},
                        -1);
                break;

            case "haha":  // Fast, bouncy, playful
                effect = VibrationEffect.createWaveform(
                        new long[]{50, 50, 100, 50},
                        new int[]{255, 100, 255, 100},
                        -1);
                break;

            case "yay":
                effect = VibrationEffect.createWaveform(
                        new long[]{150, 50, 150, 50, 150},
                        new int[]{255, 200, 255, 200, 255},
                        -1);
                break;

            case "sad":
                effect = VibrationEffect.createWaveform(
                        new long[]{600, 200, 600},
                        new int[]{100, 50, 100},
                        -1);
                break;

            case "angry":
                effect = VibrationEffect.createWaveform(
                        new long[]{100, 100, 100, 100, 100},
                        new int[]{255, 255, 255, 255, 255},
                        -1);
                break;

            default:
                effect = VibrationEffect.createOneShot(100, VibrationEffect.EFFECT_TICK);
                break;
        }
        vibrator.vibrate(effect);
    }

    @Override
    protected void onDestroy() {
        super.onDestroy();
        unregisterReceiver(vibrationReceiver);
    }
}
