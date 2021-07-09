import React from 'react'
import { useInterval } from "./hooks/useInterval";

import Web3 from "web3";


export const ConnectButton = () => {
  
  const CONTRACT_POLLING_INTERVAL = 100; // millis
  const web3I = new Web3(Web3.givenProvider);

  const [account, setAccount] = React.useState(null);


  const isWeb3Available = () =>{
      if (Web3.givenProvider == null) return false;
      return true;
  }

  const getAccountInfo = async()=>{
          const accounts = await web3I.eth.getAccounts();
          return accounts[0];
  }

  const requestAccounts = async()=>{
      await web3I.eth.requestAccounts();
      const accounts = await web3I.eth.getAccounts();
      return accounts[0];
  }
  
    const fetchData = async () => {
    
      // does the browser have web3?
      const isWeb3 = await isWeb3Available();
      if (isWeb3) {
        const currentAccount = await getAccountInfo();
        if (currentAccount === undefined) {
          setAccount(null);
        }
  
        if (currentAccount !== account) {
          setAccount(currentAccount);
        }
        
    }; // end fetch data
  
}
  
  
    useInterval(() => {
      fetchData();
    }, CONTRACT_POLLING_INTERVAL);
  

    const onConnectWallet = async () => {
      const accounts = requestAccounts();
      setAccount(accounts[0]);
    };

        return (
            <>


                {
                (account===null || account===undefined)?
                <button onClick={() => onConnectWallet()}>Connect Wallet</button>
                :
                account
                }
                

            </>
        )
    
}


