// The `Streamlit` object exists because our html file includes
// `streamlit-component-lib.js`.
// If you get an error about "Streamlit" not being defined, that
// means you're missing that file.

import {nanoid} from './node_modules/nanoid/nanoid.js';
//import initDIDKit, * as DIDKit from './node_modules/didkit-wasm/didkit_wasm.js';

function sendValue(value) {
  Streamlit.setComponentValue(value)
}

/**
 * The component's render function. This will be called immediately after
 * the component is initially loaded, and then again every time the
 * component gets new data from Python.
 */
async function onRender(event) {
  // Only run the render code the first time the component is loaded.
  if (!window.rendered) {
    window.nanoid = {nanoid};
    // dapp require nanoid
    const dapp = await import("./node_modules/@temple-wallet/dapp/dist/index.umd.js")
    const { TempleWallet } = window.dapp;

    const {dapp_name, network} = event.detail.args
    const wallet = new TempleWallet(dapp_name)
    await wallet.connect(network);
    await TempleWallet.isAvailable();
    const userAddress = wallet.pkh || (await wallet.getPKH());
    const {publicKey} = wallet.permission;
    
    sendValue({pkh : userAddress, pub : publicKey});

    // You most likely want to get the data passed in like this
    // const {input1, input2, input3} = event.detail.args

    // You'll most likely want to pass some data back to Python like this
    // sendValue({output1: "foo", output2: "bar"})
    window.rendered = true
  }
}

// Render the component whenever python send a "render event"
Streamlit.events.addEventListener(Streamlit.RENDER_EVENT, onRender)
// Tell Streamlit that the component is ready to receive events
Streamlit.setComponentReady()
// Render with the correct height, if this is a fixed-height component
Streamlit.setFrameHeight(100)
