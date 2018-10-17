import Neon, { rpc, api, sc, u } from 'neon-js'

export const resolveNnsDomain = name => {
  const protocol = {
    type: 'String',
    value: 'addr'
  }

  const empty = {
    type: 'String',
    value: ''
  }

  const subdomain = name.replace(/.neo$/, '')
  const hashSubdomain = u.sha256(u.str2hexstring(subdomain))
  const hashDomain = u.sha256(u.str2hexstring('neo'))

  const hashName = u.sha256(hashSubdomain.concat(hashDomain))
  const parsedName = sc.ContractParam.byteArray(hashName, 'name')

  const scriptHash = '348387116c4a75e420663277d9c02049907128c7'
  const operation = 'resolve'
  const args = [protocol, parsedName, empty]

  const props = {
    scriptHash,
    operation,
    args
  }

  return api
    .fillUrl({
      net: 'MainNet',
      address: ''
    })
    .then(config => {
      const script = Neon.create.script(props)
      const invokeScript = rpc.Query.invokeScript(script)
      const execution = invokeScript.execute(config.url)
      return execution
    })
    .then(res => res.result.stack[0].value)
    .then(value => {
      if (value === '00') throw new Error('No domain found.')
      return Neon.u.hexstring2str(value)
    })
}
