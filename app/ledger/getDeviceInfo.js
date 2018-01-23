// @flow
import connect from './connect'

export default async function getDeviceInfo () {
  const comm = await connect()

  try {
    return comm.device.getDeviceInfo()
  } finally {
    comm.device.close()
  }
}
