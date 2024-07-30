import { createPublicClient, formatEther, Hex, http } from "viem";
import {privateKeyToAccount} from "viem/accounts";
import {arbitrumSepolia} from "viem/chains";

import dotenv from "dotenv"

dotenv.config();

const privateKey = process.env.PRIVATE_KEY;

const account = privateKeyToAccount(privateKey as Hex);

console.log(account.address);


//IIFE
(async () => {
    const client = createPublicClient({
        chain: arbitrumSepolia,
        transport: http(process.env.API_URL)
    });

    const balance = await client.getBalance({
        address: account.address,
    })

    console.log(formatEther(balance));

    const nonce = await client.getTransactionCount({
        address: account.address
    });
    
    console.log(nonce);
    

})();