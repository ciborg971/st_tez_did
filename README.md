# st_tez_did

Streamlit component to connect to a tezos wallet and more !

## Installation instructions 

```sh
pip install st_tez_did
```

## Usage instructions

```python
import streamlit as st

from st_tez_did import st_tez_did

value = st_tez_did('MyAwesomeDapp', 'mainnet')
# Connect to your Temple wallet and display your wallet address
st.write(value)
