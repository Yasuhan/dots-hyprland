const { Notify, GLib, Gio } = imports.gi;
import * as Utils from 'resource:///com/github/Aylur/ags/utils.js';
import Battery from 'resource:///com/github/Aylur/ags/service/battery.js';

export function fileExists(filePath) {
    let file = Gio.File.new_for_path(filePath);
    return file.query_exists(null);
}


const APP_NAME = "illogical-impulse";


var batteryWarned = false;
async function batteryMessage() {
    const perc = Battery.percent;
    const charging = Battery.charging;
    if(charging) {
        batteryWarned = false;
        return;
    }
    for (let i = userOptions.battery.warnLevels.length - 1; i >= 0; i--) {
        if (perc <= userOptions.battery.warnLevels[i] && !charging && !batteryWarned) {
            batteryWarned = true;
            Utils.execAsync(['bash', '-c',
                `notify-send "${userOptions.battery.warnTitles[i]}" "${userOptions.battery.warnMessages[i]}" -u critical -a '${APP_NAME}' -t 69420 &`
            ]).catch(print);
            break;
        }
    }
}

// Run them
firstRunWelcome();
Utils.timeout(1, () => {
    Battery.connect('changed', () => batteryMessage().catch(print));
})