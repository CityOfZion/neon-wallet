import React from 'react'
import { computeN3Activity } from '../../app/actions/transactionHistoryActions'

describe('N3ClaimTest', () => {
    const addr = 'NdFBzZVMUXjdwnaDfeMK4zEVYEzjiVhFBt'
    const netwrk = 'MainNet'
    const transactions = {
        items: [{
            block: 3080890,
            hash: "0xe634006ad06edeab24160c2fb6e42f623a1e3163eea952fdfc0df186f86b50b7",
            invocations: [{
                block: 3080890,
                hash: "0xe634006ad06edeab24160c2fb6e42f623a1e3163eea952fdfc0df186f86b50b7",
                metadata: {
                    amount: 0,
                    contract_name: "NeoToken",
                    data: "",
                    from: "NdFBzZVMUXjdwnaDfeMK4zEVYEzjiVhFBt",
                    image: "http://localhost:3000/dist1ac81dc19335d81d593ebec5757d5a71.png",
                    scripthash: "0xef4073a0f2b305a38ec4050e4d3d28bc40ea63f5",
                    summary: "NeoToken transfer to NdFBzZVMUXjdwnaDfeMK4zEVYEzjiVhFBt",
                    symbol: "NEO",
                    to: "NdFBzZVMUXjdwnaDfeMK4zEVYEzjiVhFBt"},
                netfee: "122752",
                sender: "NdFBzZVMUXjdwnaDfeMK4zEVYEzjiVhFBt",
                sysfee: "997775",
                time: "1678191213.077000",
                type: "CLAIM",
                vmstate: "HALT"}],
            netfee: "122752",
            notifications: [{
                contract: "0xef4073a0f2b305a38ec4050e4d3d28bc40ea63f5",
                event_name: "Transfer",
                state: [{
                    type: "ByteString",
                    value: "vhy7ee8QtmaZ7MtM2XIJ+vhZg44="
                }, {
                    type: "ByteString",
                    value: "vhy7ee8QtmaZ7MtM2XIJ+vhZg44="
                }, {
                    type: "Integer",
                    value: "0"
                }]
                }, {
                contract: "0xd2a4cff31913016155e38e474a2c06d08be276cf",
                event_name: "Transfer",
                state: [{
                    type: "Any"
                }, {
                    type: "ByteString",
                    value: "vhy7ee8QtmaZ7MtM2XIJ+vhZg44="
                }, {
                    type: "Integer",
                    value: "233475354"
                }]
            }],
            sender: "NdFBzZVMUXjdwnaDfeMK4zEVYEzjiVhFBt",
            sysfee: "997775",
            time: "1678191213.077000",
            transfers: [{
                amount: "0",
                block: 3080890,
                from: "NdFBzZVMUXjdwnaDfeMK4zEVYEzjiVhFBt",
                scripthash: "0xef4073a0f2b305a38ec4050e4d3d28bc40ea63f5",
                time: "1678191213.077000",
                to: "NdFBzZVMUXjdwnaDfeMK4zEVYEzjiVhFBt",
                transferindex: "3080890.2",
                txid: "0xe634006ad06edeab24160c2fb6e42f623a1e3163eea952fdfc0df186f86b50b7"
                }, {
                amount: "233475354",
                block: 3080890,
                from: "mint",
                scripthash: "0xd2a4cff31913016155e38e474a2c06d08be276cf",
                time: "1678191213.077000",
                to: "NdFBzZVMUXjdwnaDfeMK4zEVYEzjiVhFBt",
                transferindex: "3080890.3",
                txid: "0xe634006ad06edeab24160c2fb6e42f623a1e3163eea952fdfc0df186f86b50b7"
            }],
            vmstate: "HALT"
        }]
    }

    test('should update the tx so it appears to be a Gas claim', async () => {
        const wrapper = await computeN3Activity(transactions, addr, netwrk)
        expect(wrapper[0].type).toEqual("CLAIM")
        expect(wrapper[0].metadata.summary).toEqual("GAS Claim to NdFBzZVMUXjdwnaDfeMK4zEVYEzjiVhFBt")
        expect(wrapper[0].metadata.symbol).toEqual('GAS')
        expect(wrapper[0].metadata.amount).toEqual(2.33475354)
    })
})
