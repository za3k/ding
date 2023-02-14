function ding() {
    let dingJson = { "oldParams": true, "wave_type": 0, "p_env_attack": 0, "p_env_sustain": 0.32110182659703, "p_env_punch": 0.2196550830035151, "p_env_decay": 0.7370400768274171, "p_base_freq": 0.2723171360931539, "p_freq_limit": 0, "p_freq_ramp": 0, "p_freq_dramp": 0, "p_vib_strength": 0, "p_vib_speed": 0, "p_arp_mod": 0.7454, "p_arp_speed": 0.4887091373691397, "p_duty": 0.6479813209932228, "p_duty_ramp": 0, "p_repeat_speed": 0, "p_pha_offset": 0, "p_pha_ramp": 0, "p_lpf_freq": 1, "p_lpf_ramp": 0.7684442529315016, "p_lpf_resonance": 0.04119690011631927, "p_hpf_freq": 0.6637707348448072, "p_hpf_ramp": 0.2322888897152109, "sound_vol": 0.449, "sample_rate": 44100, "sample_size": 8 };
    let base = {"oldParams": true, "wave_type": 0, "p_env_attack": 0.038221891177618914, "p_env_sustain": 0.34444929403935354, "p_env_punch": 0, "p_env_decay": 0.15446753444435568, "p_freq_limit": 0, "p_freq_ramp": 0.13907267033389292, "p_freq_dramp": 0.04108379023306889, "p_vib_strength": -0.008513789465370333, "p_vib_speed": -0.025172196644578045, "p_arp_mod": 0.10353989549267754, "p_arp_speed": -0.00976995388595972, "p_duty": 0.5189726993009689, "p_duty_ramp": -0.00045180553612936963, "p_repeat_speed": 0, "p_pha_offset": -0.023792329985701008, "p_pha_ramp": -0.016048098290179967, "p_lpf_freq": 1.0535216252490764, "p_lpf_ramp": 0.005303800152251403, "p_lpf_resonance": 0.021555109397537145, "p_hpf_freq": 0.11612266759249558, "p_hpf_ramp": 0, "sound_vol": 0.25, "sample_rate": 44100, "sample_size": 8, "p_vib_delay": null }
    let audio = sfxr.toAudio(dingJson);
    audio.play();
}

function updateTimer(timeMs) {
    const totalS = Math.ceil(timeMs / 1000);
    const timeM = Math.floor(totalS / 60);
    const timeS = totalS % 60;
    $(".time").text(`${timeM.toString().padStart(1, '0')}:${timeS.toString().padStart(2, '0')}`);
}

function main() {
    const timeMax = 1200*1000;
    let timeRemaining = timeMax;
    let startClicked = null;
    let timeout = null;
    let interval = null;

    function goDing() {
        startClicked = Date.now();
        updateTimer(timeRemaining);
        ding();
        timeRemaining = timeMax;
        timeout = setTimeout(goDing, timeRemaining)
    }
    function resume() {
        $(".start").hide();
        $(".pause").show();
        startClicked = Date.now();
        timeout = setTimeout(goDing, timeRemaining)
        interval = setInterval(function() {
            updateTimer(timeRemaining - (Date.now()-startClicked));
        }, 100);

    }
    function pause() {
        $(".start").show();
        $(".pause").hide();
        timeRemaining -= Date.now() - startClicked;
        clearTimeout(timeout);
        clearInterval(interval);
        updateTimer(timeRemaining);
    }

    $(".pause").hide().on("click", pause);
    $(".test-sound").on("click", ding);
    $(".start").show().on("click", resume);
    updateTimer(timeRemaining);
}

$(document).ready(main);
