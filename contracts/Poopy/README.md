# Compiling your Python smart contract with neo3-boa

To compile python scripts into smart contracts for the Neo blockchain it will be necessary to utilize neo3-boa.

If you don't have it installed, installing it is quite easy: 
- Download and install Python (if you don't have it yet);
- Install neo3-boa using pip:
```shell
> pip install neo3-boa
```

For more information about neo3-boa check the documentation [here](https://dojo.coz.io/neo3/boa/index.html).

## `src` folder

If you already had neo3-boa installed, your smart contract should already be compiled. 
Inside `src` you will find the original python script together with the files needed for debugging and deploying to the blockchain: 
- `Poopy_contract.manifest.json`
- `Poopy_contract.nef`
- `Poopy_contract.nefdbgnfo`
- `Poopy_contract.py`

After changing the smart contract, you'll need to compile it again using neo3-boa:

```shell
> neo3-boa <insert path to smart contract>
```

> Note: previously compiled files will be overwritten.

## `test` folder

If you want to test your smart contract before deploying it to MainNet or TestNet, a private chain should already have been created inside the `test` folder. 
Inside it you'll see the following files:
- `PoopyTests.neo-express`
    - The private chain itself, you should find it by its name on the visual tracker.
- `setup-test-chain.batch`
    - This batch was used to transfer some GAS to alice, bob and owner's accounts in the private chain.
