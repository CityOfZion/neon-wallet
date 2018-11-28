import poll, { TimeoutError } from '../../app/util/poll'

describe('poll functionality', () => {
  test('should stop when condition fulfilled', async () => {
    // 10 rounds of 10ms
    const pollCfg = { attempts: 10, frequency: 10 }

    // pulfill the poll condition after 5th attempt
    let num = 5
    const condition = jest.fn(() => {
      return --num === 0 ? Promise.resolve(num) : Promise.reject()
    })

    // run poll, expect no exit by error
    const result = await poll(condition, pollCfg)
    // expect to have run 5/10 attempts
    expect(condition).toHaveBeenCalledTimes(5)
  })

  test('should stop when max attempts reached', async () => {
    // 10 rounds of 10ms
    const pollCfg = { attempts: 10, frequency: 10 }
    // always reject means poll is continuous
    const condition = jest.fn(() => Promise.reject())

    try {
      await poll(condition, pollCfg) // run poll
    } catch (e) {
      expect(e.name).toBe(TimeoutError.name) // expect it to reach max attempts
      expect(condition).toHaveBeenCalledTimes(11) // expect to have run 10 (+1) attempts
    }
  })
})
