import {  createWalletClient, Hex, http, publicActions } from "viem";
import {privateKeyToAccount} from "viem/accounts";
import {arbitrumSepolia} from "viem/chains";
import funJson from "../artifacts/Fun.json"

import dotenv from "dotenv"

const {abi, bin} = funJson["contracts"]["contracts/Fun.sol:Fun"]

dotenv.config();

const privateKey = process.env.PRIVATE_KEY;

const account = privateKeyToAccount(privateKey as Hex);

(async () => {
    const client = createWalletClient({
        account,
        chain: arbitrumSepolia,
        transport : http(process.env.API_URL),
    }).extend(publicActions);

   const hash = await client.deployContract({
        abi,
        bytecode: '0x${bin}',
    });

    console.log(hash);
})();