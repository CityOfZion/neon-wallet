// flow-typed signature: f09e8a32feb87727884e6a71342d82bb
// flow-typed version: 94e9f7e0a4/node-hid_v0.x.x/flow_>=v0.17.x


declare module 'node-hid' {

  declare type HIDDeviceDescription = {
    vendorId: number;
    productId: number;
    path: string;
    serialNumber: string;
    manufacturer: string;
    product: string;
    release: number;
    interface: number;
  }
  
  declare function devices(): Array<HIDDeviceDescription>;

  declare class HID extends events$EventEmitter {
    constructor(pathOrVid: string|number, pid?: ?number): void;
    write(buffer: Array<number>): void;
    read(fun: (err?: Error, data?: Buffer) => void): void;
    readSync(): Array<number>;
    readTimeout(time_out: number): Array<number>;
    sendFeatureReport(data: Array<number>): void;
    getFeatureRerport(): Array<number>;
    pause(): void;
    resume(): void;
    close(): void;
  }

}
