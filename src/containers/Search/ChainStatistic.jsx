import React from 'react';
import { Text, Pane, Heading, CardHover, Icon } from '@cybercongress/gravity';
import BandwidthBar from './BandwidthBar';
import {
  formatNumber,
  getStatistics,
  getValidators,
} from '../../utils/search/utils';

class ChainStatistic extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      linksCount: 0,
      cidsCount: 0,
      accsCount: 0,
      txCount: 0,
      blockNumber: 0,
      linkPrice: 0,
      totalCyb: 0,
      stakedCyb: 0,
      activeValidatorsCount: 0,
    };
  }

  componentWillMount() {
    this.getStatisticsBrain();
  }

  getStatisticsBrain = async () => {
    const statisticContainer = await getStatistics();
    const validatorsStatistic = await getValidators();

    const {
      linksCount,
      cidsCount,
      accsCount,
      txCount,
      height,
      bandwidthPrice,
      bondedTokens,
      notBondedTokens,
    } = statisticContainer;

    const { validators } = validatorsStatistic;
    const activeValidatorsCount = validators;

    const totalCyb = parseInt(bondedTokens) + parseInt(notBondedTokens);
    const stakedCyb = ((bondedTokens / totalCyb) * 100).toFixed(0);
    const linkPrice = (400 * +bandwidthPrice).toFixed(0);

    this.setState({
      linksCount,
      cidsCount,
      accsCount,
      txCount,
      blockNumber: height,
      linkPrice,
      totalCyb,
      stakedCyb,
      activeValidatorsCount: activeValidatorsCount.length,
    });
  };

  render() {
    const {
      linksCount,
      cidsCount,
      accsCount,
      txCount,
      blockNumber,
      linkPrice,
      totalCyb,
      stakedCyb,
      activeValidatorsCount,
    } = this.state;
    const totalGcyb = (totalCyb / 1000000000).toFixed(0);

    return (
      <div>
        {/* <BandwidthBar
          bwRemained={bwRemained}
          bwMaxValue={bwMaxValue}
          linkPrice={linkPrice}
        /> */}

        <Pane marginTop={50} marginBottom={50}>
          <Heading size={600} color="#fff" marginBottom={24}>
            Knowledge grapth
          </Heading>
          <Pane display="flex" marginX={-15}>
            <CardHover
              flex={1}
              display="flex"
              alignItems="center"
              flexDirection="column"
              backgroundColor="#000000"
              paddingY={50}
              marginX={15}
            >
              <Text
                display="inline-block"
                marginBottom={15}
                color="#4ed6ae"
                fontSize="30px"
              >
                {formatNumber(linksCount)}
              </Text>

              <Text display="inline-block" color="#4ed6ae">
                cyberlinks
              </Text>
            </CardHover>
            <CardHover
              flex={1}
              paddingY={50}
              display="flex"
              alignItems="center"
              flexDirection="column"
              backgroundColor="#000000"
              marginX={15}
            >
              <Text
                display="inline-block"
                marginBottom={15}
                color="#4ed6ae"
                fontSize="30px"
              >
                {formatNumber(cidsCount)}
              </Text>

              <Text display="inline-block" color="#4ed6ae">
                content ids
              </Text>
            </CardHover>
            <CardHover
              flex={1}
              paddingY={50}
              display="flex"
              alignItems="center"
              flexDirection="column"
              backgroundColor="#000000"
              marginX={15}
            >
              <Text
                display="inline-block"
                marginBottom={15}
                color="#4ed6ae"
                fontSize="30px"
              >
                {formatNumber(accsCount)}
              </Text>

              <Text display="inline-block" color="#4ed6ae">
                accounts
              </Text>
            </CardHover>
          </Pane>
        </Pane>
        <Pane marginBottom={50}>
          <Heading size={600} color="#fff" marginBottom={24}>
            Cybernomics
          </Heading>
          <Pane display="flex" marginX={-15}>
            <CardHover
              flex={1}
              display="flex"
              alignItems="center"
              flexDirection="column"
              backgroundColor="#000"
              paddingY={50}
              marginX={15}
            >
              <Text
                display="inline-block"
                marginBottom={15}
                color="#4ed6ae"
                fontSize="30px"
              >
                {formatNumber(totalGcyb)}
              </Text>

              <Text display="inline-block" color="#4ed6ae">
                total GCYB
              </Text>
            </CardHover>
            <CardHover
              flex={1}
              paddingY={50}
              display="flex"
              alignItems="center"
              flexDirection="column"
              backgroundColor="#000000"
              marginX={15}
            >
              <Text
                display="inline-block"
                marginBottom={15}
                color="#4ed6ae"
                fontSize="30px"
              >
                {stakedCyb}
              </Text>

              <Text display="inline-block" color="#4ed6ae">
                staked CYB (%)
              </Text>
            </CardHover>
            <CardHover
              flex={1}
              paddingY={50}
              display="flex"
              alignItems="center"
              flexDirection="column"
              backgroundColor="#000000"
              marginX={15}
            >
              <Text
                display="inline-block"
                marginBottom={15}
                color="#4ed6ae"
                fontSize="30px"
              >
                {linkPrice}
              </Text>

              <Text display="inline-block" color="#4ed6ae">
                price of cyberlink (BP)
              </Text>
            </CardHover>
          </Pane>
        </Pane>
        <Pane marginBottom={50}>
          <Heading size={600} color="#fff" marginBottom={24}>
            Consensus
          </Heading>
          <Pane display="flex" marginX={-15}>
            <a
              href="/#/validators"
              style={{
                display: 'contents',
                textDecoration: 'none',
              }}
            >
              <CardHover
                flex={1}
                display="flex"
                alignItems="center"
                flexDirection="column"
                backgroundColor="#000"
                paddingY={50}
                marginX={15}
              >
                <Text
                  display="inline-block"
                  marginBottom={15}
                  color="#4ed6ae"
                  fontSize="30px"
                >
                  {activeValidatorsCount}
                </Text>
                <Pane display="flex" alignItems="center">
                  <Text color="#4caf50">active validators</Text>
                  <Icon icon="arrow-right" color="#4caf50" marginLeft={5} />
                </Pane>
              </CardHover>
            </a>
            <CardHover
              flex={1}
              paddingY={50}
              display="flex"
              alignItems="center"
              flexDirection="column"
              backgroundColor="#000000"
              marginX={15}
            >
              <Text
                display="inline-block"
                marginBottom={15}
                color="#4ed6ae"
                fontSize="30px"
              >
                {formatNumber(txCount)}
              </Text>

              <Text display="inline-block" color="#4ed6ae">
                transactions
              </Text>
            </CardHover>
            <CardHover
              flex={1}
              paddingY={50}
              display="flex"
              alignItems="center"
              flexDirection="column"
              backgroundColor="#000000"
              marginX={15}
            >
              <Text
                display="inline-block"
                marginBottom={15}
                color="#4ed6ae"
                fontSize="30px"
              >
                {formatNumber(blockNumber)}
              </Text>

              <Text display="inline-block" color="#4ed6ae">
                last block
              </Text>
            </CardHover>
          </Pane>
        </Pane>
      </div>
    );
    //             }}
    //         </Subscribe>
    //     </Provider>
    // );
  }
}

export default ChainStatistic;