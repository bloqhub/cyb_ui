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
import { CYBER, DEFAULT_GAS_LIMITS, WARP_CONTRACTS, DEFAULT_SKILLS } from '../../utils/config';
import useSetActiveAddress from '../../hooks/useSetActiveAddress';
import txs from '../../utils/txs';
import { getPin, getPinsCid, getIpfsGatway, getTxs } from '../../utils/search/utils';
import { GasPrice } from '@cosmjs/launchpad';

import { Dots, ValueImg, ButtonIcon } from '../../components';

import ItemsList from './components/items_list';
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
    const [skills, setSkills] = useState({});

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


    const loadSkills = () => {
        const data = jsCyber.queryContractSmart(
            WARP_CONTRACTS.SKILLS,
            {
                "get_items": {}
            }
        );

        data.then((result) => {
console.log('wwwwwwadwadwadawwwwww',DEFAULT_SKILLS);
            let availableSkills=DEFAULT_SKILLS;
            setSkills(availableSkills);


        });
    };

    let onActivate = (skillType, item)=>{

        localStorage.setItem(`skill-${skillType}`, JSON.stringify(item));
        // alert(3333);
    }

    // const loadContractData = (jsCyber, offset) => {
    //     const data = jsCyber.queryContractSmart(
    //         WARP_CONTRACTS.CHANNELS,
    //         {
    //             "get_items": {}
    //         }
    //     );
    //
    //     data.then((result) => {
    //         setContractData(result.entries);
    //     });
    // };
    // const getItems = (offset) => {
    //
    //
    //     useEffect(() => {
    //         if (jsCyber === null) {
    //             return;
    //         }
    //
    //         loadContractData(jsCyber);
    //     }, [jsCyber]);
    //
    //     return { contractData };
    // };

        useEffect(() => {
            if (jsCyber === null) {
                return;
            }
            loadSkills();
        }, [jsCyber]);



    let content;

    content = (
        <div style={{ width: "100%" }}>
            <h1>Skills</h1>
            <div>
                {/* {editing ? ( */}
                {/*     <div> */}
                {/*         <EditItemForm tokens={tokens} networks={networks} data={editing} editRow={editRow} onCancel={(e) => setEditing(false)} */}
                {/*                       onDelete={deleteRow}/> */}
                {/*     </div> */}
                {/* ) : (creating ? ( */}
                {/*         <div> */}
                {/*             <AddItemForm tokens={tokens} networks={networks} addRow={addRow} onCancel={(e) => setCreating(false)}/> */}
                {/*         </div> */}
                {/*     ) : <div></div> */}
                {/* ) */}
                {/* } */}
            </div>
            <div className={styles.containerWarpFieldsInputContainer}>

                <ItemsList items={skills} onActivate={onActivate} />

                {/* <input type="button" className="btn " value="Add new channel" onClick={(e) => setCreating(true)}/> */}
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
