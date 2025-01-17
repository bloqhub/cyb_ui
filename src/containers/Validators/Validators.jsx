import React, { useEffect, useState, useContext } from 'react';
import { connect } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { fromBech32, formatNumber, asyncForEach } from '../../utils/utils';
import { Loading } from '../../components';
import ActionBarContainer from './ActionBarContainer';
import {
  TableHeroes,
  TableItem,
  TextBoard,
  TabBtnList,
  InfoBalance,
} from './components';
import { AppContext } from '../../context';
import getHeroes from './getHeroesHook';
import { BOND_STATUS } from '../../utils/config';
import { useGetBalance } from '../account/hooks';
import useSetActiveAddress from '../../hooks/useSetActiveAddress';

function Validators({ mobile, defaultAccount }) {
  const location = useLocation();
  const { jsCyber } = useContext(AppContext);
  const [updatePage, setUpdatePage] = useState(0);
  const { addressActive } = useSetActiveAddress(defaultAccount);
  const { balance, loadingBalanceInfo, balanceToken } = useGetBalance(
    addressActive,
    updatePage
  );
  const { validators, countHeroes, loadingValidators } = getHeroes();
  const [loadingSelf, setLoadingSelf] = useState(true);
  const [loadingBond, setLoadingBond] = useState(true);
  const [bondedTokens, setBondedTokens] = useState(0);
  const [validatorSelect, setValidatorSelect] = useState([]);
  const [selectedIndex, setSelectedIndex] = useState('');
  const [selected, setSelected] = useState('active');
  const [unStake, setUnStake] = useState(false);
  const [delegationsData, setDelegationsData] = useState([]);
  const [validatorsData, setValidatorsData] = useState([]);
  // console.log('balanceToken', balanceToken);

  useEffect(() => {
    setValidatorsData(validators);
    setSelectedIndex('');
  }, [validators]);

  const updateFnc = () => {
    setUpdatePage((item) => item + 1);
    setValidatorSelect([]);
  };

  useEffect(() => {
    if (addressActive !== null) {
      setLoadingBond(true);
      setLoadingSelf(true);
    }
  }, [addressActive]);

  useEffect(() => {
    const { pathname } = location;

    if (pathname.match(/jailed/gm) && pathname.match(/jailed/gm).length > 0) {
      setSelected('jailed');
    } else {
      setSelected('active');
    }
  }, [location.pathname]);

  useEffect(() => {
    const feachPool = async () => {
      if (jsCyber !== null) {
        const response = await jsCyber.stakingPool();
        if (response.pool.bondedTokens) {
          setBondedTokens(response.pool.bondedTokens);
        }
      }
    };
    feachPool();
  }, [jsCyber]);

  useEffect(() => {
    try {
      const feachDelegatorDelegations = async () => {
        let delegationsDataTemp = [];
        if (addressActive !== null && jsCyber !== null) {
          const responseDelegatorDelegations = await jsCyber.delegatorDelegations(
            addressActive.bech32
          );
          delegationsDataTemp =
            responseDelegatorDelegations.delegationResponses;
        }
        setDelegationsData(delegationsDataTemp);
      };
      feachDelegatorDelegations();
    } catch (e) {
      console.log(`e`, e);
      setDelegationsData([]);
    }
  }, [addressActive, jsCyber, updatePage]);

  useEffect(() => {
    if (validators.length > 0 && delegationsData.length > 0) {
      const tempValidators = [...validators];
      const tempDelegationsData = [...delegationsData];

      tempDelegationsData.forEach((item) => {
        tempValidators.forEach((itemValidators, j) => {
          if (
            itemValidators.operatorAddress === item.delegation.validatorAddress
          ) {
            tempValidators[j].delegation = item.balance;
          }
        });
      });
      setValidatorsData(tempValidators);
      setLoadingBond(false);
    } else {
      setLoadingBond(true);
    }
  }, [delegationsData, validators]);

  useEffect(() => {
    const selfDelegation = async () => {
      if (jsCyber !== null && validatorsData.length > 0) {
        await asyncForEach(
          Array.from(Array(validatorsData.length).keys()),
          async (item) => {
            const delegatorAddress = fromBech32(
              validatorsData[item].operatorAddress
            );
            let shares = 0;
            try {
              const getSelfDelegation = await jsCyber.delegation(
                delegatorAddress,
                validatorsData[item].operatorAddress
              );
              const { delegationResponse } = getSelfDelegation;
              if (
                delegationResponse.balance.amount &&
                validatorsData[item].delegatorShares > 0
              ) {
                const selfShares = delegationResponse.balance.amount;
                const delegatorShares =
                  validatorsData[item].delegatorShares * 10 ** -18;
                shares = (selfShares / delegatorShares) * 100;
              }
            } catch (error) {
              shares = 0;
            }
            validatorsData[item].shares = formatNumber(
              Math.floor(shares * 100) / 100,
              2
            );
          }
        );
        setLoadingSelf(false);
      }
    };
    selfDelegation();
  }, [validatorsData, jsCyber]);

  const selectValidators = (validator, index) => {
    let selectValidator = {};
    let stake = false;

    if (selectedIndex === index) {
      setSelectedIndex('');
    } else {
      setSelectedIndex(index);
    }
    if (validatorSelect !== validator) {
      selectValidator = validator;
      if (selectValidator.delegation) {
        if (parseFloat(selectValidator.delegation.amount) > 0) {
          stake = true;
        }
      }
    }
    setValidatorSelect(selectValidator);
    setUnStake(stake);
  };

  if (loadingValidators) {
    return (
      <div
        style={{
          width: '100%',
          height: '50vh',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          flexDirection: 'column',
        }}
      >
        <Loading />
        <div style={{ color: '#fff', marginTop: 20, fontSize: 20 }}>
          Loading
        </div>
      </div>
    );
  }

  return (
    <div>
      <main className="block-body" style={{ paddingTop: 0 }}>
        {/* <TabBtnList selected={selected} countHeroes={countHeroes} /> */}
        <InfoBalance
          balance={balance}
          loadingBalanceInfo={loadingBalanceInfo}
          balanceToken={balanceToken}
        />
        <TableHeroes mobile={mobile} showJailed={selected === 'jailed'}>
          {validatorsData
            .filter((validator) =>
              selected === 'jailed'
                ? BOND_STATUS[validator.status] < 3
                : BOND_STATUS[validator.status] === 3
            )
            .map((validator, index) => {
              const commission = formatNumber(
                validator.commission.commissionRates.rate * 10 ** -18 * 100,
                2
              );
              const staking = formatNumber(
                Math.floor((validator.tokens / bondedTokens) * 100 * 100) / 100,
                2
              );
              return (
                <TableItem
                  key={validator.operator_address}
                  staking={staking}
                  commission={commission}
                  item={validator}
                  index={index + 1}
                  selected={index === selectedIndex}
                  selectValidators={() => selectValidators(validator, index)}
                  mobile={mobile}
                  showJailed={selected === 'jailed'}
                  loadingSelf={loadingSelf}
                  loadingBond={loadingBond}
                />
              );
            })}
        </TableHeroes>
      </main>
      <ActionBarContainer
        updateFnc={updateFnc}
        validators={validatorSelect}
        validatorsAll={validatorsData}
        addressPocket={addressActive}
        unStake={unStake}
        mobile={mobile}
        balance={balance}
        loadingBalanceInfo={loadingBalanceInfo}
        balanceToken={balanceToken}
      />
    </div>
  );
  // }
}

const mapStateToProps = (store) => {
  return {
    mobile: store.settings.mobile,
    defaultAccount: store.pocket.defaultAccount,
  };
};

export default connect(mapStateToProps)(Validators);
