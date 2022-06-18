import { devices as rawDevices, HID } from "node-hid";
import { DEVICE_VID, DEVICE_PID } from "./constants";
import { Device } from "./device";

export const devices = () =>
  rawDevices()
    .filter(
      ({ vendorId, productId }) =>
        vendorId === DEVICE_VID && productId === DEVICE_PID
    )
    .map((device) => new Device(new HID(device.path as string)));
