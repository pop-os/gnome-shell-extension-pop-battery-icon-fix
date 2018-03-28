const Main = imports.ui.main;
const UPower = imports.gi.UPowerGlib;


function init() {
}

function enable() {
    this.power = Main.panel.statusArea.aggregateMenu._power;

    this.power._oldSync = this.power._sync;

    this.power.getIcon = getIcon;

    this.power._sync = function(){
      this._oldSync();

      if(this._proxy.IsPresent){
          icon = this.getIcon(this._proxy.Percentage, this._proxy.State == UPower.DeviceState.CHARGING);

          this._indicator.icon_name = icon;
          this._item.icon.icon_name = icon;
      }
    }

    this.power.prototype._sync = this.power._sync;

    this.power._sync();
}

function getIcon(percentage, charging){
    if (percentage < 10)
      return charging ? "battery-caution-charging-symbolic" : "battery-caution-symbolic";
    else if (percentage < 30)
      return charging ? "battery-low-charging-symbolic" : "battery-low-symbolic";
    else if (percentage < 60)
      return charging ? "battery-medium-charging-symbolic" : "battery-medium-symbolic";
    else if (percentage < 90)
      return charging ? "battery-good-charging-symbolic" : "battery-good-symbolic";
    return charging ? "battery-full-charging-symbolic" : "battery-full-symbolic";
}



function disable() {
    this.power._sync = this.power._oldSync;
    this.power._oldSync = undefined;
    this.power.getIcon = undefined;
    this.power._sync();
}
