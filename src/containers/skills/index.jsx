import React, {
    useContext,
    useEffect,
    useState,
} from 'react';
import { connect } from 'react-redux';
import { useLocation, useHistory, Route } from 'react-router-dom';
import { Pane } from '@cybercongress/gravity';
import BigNumber from 'bignumber.js';
import queryString from 'query-string';
import { AppContext } from '../../context';
import { CYBER, DEFAULT_GAS_LIMITS, WARP_CONTRACTS } from '../../utils/config';
import useSetActiveAddress from '../../hooks/useSetActiveAddress';
import txs from '../../utils/txs';
import { getPin, getPinsCid, getIpfsGatway, getTxs } from '../../utils/search/utils';
import { GasPrice } from '@cosmjs/launchpad';

import { Dots, ValueImg, ButtonIcon } from '../../components';

// import ItemsList from './components/channels/items_list';
// import AddItemForm from './components/channels/items_add';
// import EditItemForm from './components/channels/items_edit';

import styles from './skills.scss';


function Skills({ defaultAccount, ipfs, statusChecker}) {

    const { jsCyber, keplr } = useContext(AppContext);
    const location = useLocation();
    const history = useHistory();
    const { addressActive } = useSetActiveAddress(defaultAccount);
    // const [update, setUpdate] = useState(0);
    // const [editing, setEditing] = useState(false);
    // const [creating, setCreating] = useState(false);
    // const [contractData, setContractData] = useState([]);
    // const [networks, setNetworks] = useState([]);
    // const [tokens, setTokens] = useState([]);

    // const loadNetworksData = (jsCyber, offset) => {
    //     const data = jsCyber.queryContractSmart(
    //         WARP_CONTRACTS.NETWORKS,
    //         {
    //             "get_items": {}
    //         }
    //     );
    //
    //     data.then((result) => {
    //         setNetworks(result.entries);
    //     });
    // };

    const loadSkills = (jsCyber, offset) => {
        const data = jsCyber.queryContractSmart(
            WARP_CONTRACTS.SKILLS,
            {
                "get_items": {}
            }
        );

        data.then((result) => {
            setTokens(result.entries);
        });
    };



    const loadContractData = (jsCyber, offset) => {
        const data = jsCyber.queryContractSmart(
            WARP_CONTRACTS.CHANNELS,
            {
                "get_items": {}
            }
        );

        data.then((result) => {
            setContractData(result.entries);
        });
    };
    const getItems = (offset) => {


        useEffect(() => {
            if (jsCyber === null) {
                return;
            }

            loadContractData(jsCyber);
        }, [jsCyber]);

        return { contractData };
    };


    const deleteRow = async (id) => {
        return new Promise(async (accept, reject) => {

            try {
                const gasPrice = GasPrice.fromString('0.001boot');
                const [{ address }] = await keplr.signer.getAccounts();
                const outgoinxTxData = await keplr.execute(
                    address,
                    WARP_CONTRACTS.CHANNELS,
                    {
                        "DeleteEntry": {
                            "id": id
                        }
                    },
                    txs.calculateFee(400000, gasPrice)
                );


                let txData = await statusChecker(outgoinxTxData.transactionHash);
                if (txData.raw_log.indexOf('failed') !== -1) {
                    return reject(new Error(txData.raw_log));
                }


                setTimeout(() => {
                    setEditing(false);
                    loadContractData(jsCyber);
                    accept()
                }, 300);
            } catch (e) {
                reject(e)
            }

        })


    };


    const editRow = async (id, source_channel_id, destination_channel_id, source_chain_id, destination_chain_id, rpc, token) => {
        return new Promise(async (accept, reject) => {
            try {
                const gasPrice = GasPrice.fromString('0.001boot');

                try {
                    const [{ address }] = await keplr.signer.getAccounts();
                    let options = { "id": id, };
                    if (destination_chain_id) {
                        options['destination_chain_id'] = destination_chain_id;
                    }

                    if (destination_channel_id) {
                        options['destination_channel_id'] = destination_channel_id;
                    }

                    if (source_chain_id) {
                        options['source_chain_id'] = source_chain_id;
                    }

                    if (source_channel_id) {
                        options['source_channel_id'] = source_channel_id;
                    }

                    if (rpc) {
                        options['explorer_url'] = rpc;
                    }

                    if (token) {
                        options['token'] = token;
                    }

                    const outgoinxTxData = await keplr.execute(
                        address,
                        WARP_CONTRACTS.CHANNELS,
                        {
                            "UpdateEntry": options
                        },
                        txs.calculateFee(400000, gasPrice)
                    );


                    let txData = await statusChecker(outgoinxTxData.transactionHash);
                    if (txData.raw_log.indexOf('failed') !== -1) {
                        return reject(new Error(txData.raw_log));
                    }

                    setTimeout(() => {
                        loadContractData(jsCyber);
                        setEditing(false);
                        accept();
                    }, 300);
                } catch (e) {
                    reject(e);
                }
            } catch (e) {
                reject(e);
            }


        })


    };

    // sourceChannelId, destChannelId, sourceChainId, destinationChainId, rpc, token
    const addRow = async (destination_chain_id, destination_channel_id, source_chain_id, source_channel_id, rpc, token) => {
        return new Promise(async (accept, reject) => {
            try {

                const gasPrice = GasPrice.fromString('0.001boot');

                const [{ address }] = await keplr.signer.getAccounts();
                try {
                    const outgoinxTxData = await keplr.execute(
                        address,
                        WARP_CONTRACTS.CHANNELS,
                        {
                            "NewEntry": {
                                "destination_chain_id": destination_chain_id,
                                "destination_channel_id": destination_channel_id,
                                "source_chain_id": source_chain_id,
                                "source_channel_id": source_channel_id,
                                "explorer_url": rpc,
                                "token": token,
                            }
                        },
                        txs.calculateFee(400000, gasPrice)
                    );


                    let txData = await statusChecker(outgoinxTxData.transactionHash);
                    if (txData.raw_log.indexOf('failed') !== -1) {
                        return reject(new Error(txData.raw_log));
                    }

                    setTimeout(() => {
                        loadContractData(jsCyber);
                        setCreating(false);
                        accept();
                    }, 300);
                } catch (e) {
                    reject(e);
                }
            } catch (e) {
                reject(e);
            }
        })


    };

    getItems();
    useEffect(() => {
        if (jsCyber === null) {
            return;
        }

        loadNetworksData(jsCyber);
        loadTokensData(jsCyber);
    }, [jsCyber]);

    let content;

    content = (
        <div style={{ width: "100%" }}>
            <h1>Channels</h1>
            <div>
                {editing ? (
                    <div>
                        <EditItemForm tokens={tokens} networks={networks} data={editing} editRow={editRow} onCancel={(e) => setEditing(false)}
                                      onDelete={deleteRow}/>
                    </div>
                ) : (creating ? (
                        <div>
                            <AddItemForm tokens={tokens} networks={networks} addRow={addRow} onCancel={(e) => setCreating(false)}/>
                        </div>
                    ) : <div></div>
                )
                }
            </div>
            <div className={styles.containerWarpFieldsInputContainer}>
                <h2>Available channels</h2>
                <ItemsList items={contractData} onEdit={(params) => setEditing(params)}/>

                <input type="button" className="btn " value="Add new channel" onClick={(e) => setCreating(true)}/>
            </div>
        </div>
    );


    return (
        <>
            <main className="block-body">

                <Pane
                    width="100%"
                    display="flex"
                    alignItems="center"
                    flexDirection="column"
                >
                    {content}
                </Pane>
            </main>

        </>
    );
}

const mapStateToProps = (store) => {
    return {
        mobile: store.settings.mobile,
        defaultAccount: store.pocket.defaultAccount,
        ipfs: store.ipfs.ipfs,
    };
};

export default connect(mapStateToProps)(Skills);
