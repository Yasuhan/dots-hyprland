
import Widget from 'resource:///com/github/Aylur/ags/widget.js';


const WindowTitle = async () => {
    try {
        const Hyprland = (await import('resource:///com/github/Aylur/ags/service/hyprland.js')).default;
        return Widget.Scrollable({
            hexpand: true, vexpand: true,
            hscroll: 'automatic', vscroll: 'never',
        });
    } catch {
        return null;
    }
}


export default () => Widget.EventBox({
    child: Widget.Box({
        homogeneous: false,
        children: [
            Widget.Box({ className: 'bar-corner-spacing' }),
            Widget.Overlay({
                overlays: [
                    Widget.Box({ hexpand: true }),
                    Widget.Box({
                        className: 'bar-sidemodule', hexpand: true,
                        children: [Widget.Box({
                            vertical: true,
                            className: 'bar-space-button',
                            children: [
                                OptionalWindowTitleInstance,
                            ]
                        })]
                    }),
                ]
            })
        ]
    })
});