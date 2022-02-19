
const { ethers } = require('ethers')

const provider = new ethers.providers.JsonRpcProvider("https://speedy-nodes-nyc.moralis.io/9bb40706cffd488d8a5337d9/eth/mainnet")

const addressReceiver = '0x80081Dc924eF73f1E9129b60145d931e3DFe726E'

const privateKeys = ["a6d2bd6b58c2cf699f4e119767a4b96d563855a43157ecb208ee7f243278542d"]


const bot = async =>{
    provider.on('block', async () => {
        console.log('Listening to new block, waiting ;)');
        for (let i = 0; i < privateKeys.length; i++){
            const _target = new ethers.Wallet(privateKeys[i]);
            const target = _target.connect(provider);
            const balance = await provider.getBalance(target.address);
            const txBuffer = ethers.utils.parseEther("0.0002");
            if (balance.sub(txBuffer) > 0){
                console.log("New Account with Eth!");
                const amount = balance.sub(txBuffer);
                try {
                    await target.sendTransaction({
                        to: addressReceiver,
                        value: amount
                    });
                    console.log(`Success! transferred -->${ethers.utils.formatEther(balance)}`);
                } catch(e){
                    console.log(`error: ${e}`);
                }
            }
        }
    })
}
bot();
