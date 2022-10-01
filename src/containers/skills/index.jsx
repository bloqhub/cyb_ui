import React, { useEffect, useState, useContext, useCallback } from 'react';
import { connect } from 'react-redux';
import { SigningStargateClient } from '@cosmjs/stargate';
import { AppContext } from '../../context';
import useSetActiveAddress from '../../hooks/useSetActiveAddress';
import { reduceBalances, formatNumber } from '../../utils/utils';
import coinDecimalsConfig from '../../utils/configToken';
import { getCoinDecimals } from '../teleport/utils';
import { Denom } from '../../components';
import { getKeplr } from '../ibc/useSetupIbc';


function Skills({ defaultAccount }) {
  const { jsCyber, keplr } = useContext(AppContext);
  const { addressActive } = useSetActiveAddress(defaultAccount);




  return (
    <>
      <main
        className="block-body"
        style={{ display: 'flex', flexDirection: 'column', gridGap: '20px' }}
      >
      </main>

    </>
  );
}

const mapStateToProps = (store) => {
  return {
    defaultAccount: store.pocket.defaultAccount,
  };
};

export default connect(mapStateToProps)(Skills);
