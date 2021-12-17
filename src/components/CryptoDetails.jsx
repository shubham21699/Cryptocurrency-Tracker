import React, { useState } from 'react';
import HTMLReactParser from 'html-react-parser';
import { useParams } from 'react-router-dom';
import millify from 'millify';
import { Col, Row, Typography, Select } from 'antd';
import { MoneyCollectOutlined, DollarCircleOutlined, FundOutlined, ExclamationCircleOutlined, StopOutlined, TrophyOutlined, CheckOutlined, NumberOutlined, ThunderboltOutlined } from '@ant-design/icons';
import { useGetCryptoDetailsQuery, useGetCryptoHistoryQuery } from '../services/cryptoAPI';

import LineChart from './LineChart';

const { Title, Text } = Typography;
const { Option } = Select;

const CryptoDetails = () => {
    // useParams() will take the id in the url and allow it use it as variable
    const { coinId } = useParams();

    const [timePeriod, setTimePeriod] = useState('7d'); //Here 7d means 7 days of time period
    const { data, isFetching } = useGetCryptoDetailsQuery(coinId);
    const { data: coinHistory } = useGetCryptoHistoryQuery({ coinId, timePeriod });
    // console.log(data);
    if(isFetching) return 'Loading...';

    const cryptoDetails = data?.data?.coin;
    // const time = ['3 hours', '24 hours', '7 days', '30 days', '1 year', '3 months', '3 years', '5 years'];
    const time = ['3h', '24h', '7d', '30d', '1y', '3m', '3y', '5y'];

  const stats = [
    { title: 'Price to USD', value: `$ ${cryptoDetails.price && millify(cryptoDetails.price)}`, icon: <DollarCircleOutlined /> },
    { title: 'Rank', value: cryptoDetails.rank, icon: <NumberOutlined /> },
    { title: '24h Volume', value: `$ ${cryptoDetails.volume && millify(cryptoDetails.volume)}`, icon: <ThunderboltOutlined /> },
    { title: 'Market Cap', value: `$ ${cryptoDetails.marketCap && millify(cryptoDetails.marketCap)}`, icon: <DollarCircleOutlined /> },
    { title: 'All-time-high(daily avg.)', value: `$ ${millify(cryptoDetails.allTimeHigh.price)}`, icon: <TrophyOutlined /> },
  ];

  const genericStats = [
    { title: 'Number Of Markets', value: cryptoDetails.numberOfMarkets, icon: <FundOutlined /> },
    { title: 'Number Of Exchanges', value: cryptoDetails.numberOfExchanges, icon: <MoneyCollectOutlined /> },
    { title: 'Aprroved Supply', value: cryptoDetails.approvedSupply ? <CheckOutlined /> : <StopOutlined />, icon: <ExclamationCircleOutlined /> },
    { title: 'Total Supply', value: `$ ${millify(cryptoDetails.totalSupply)}`, icon: <ExclamationCircleOutlined /> },
    { title: 'Circulating Supply', value: `$ ${millify(cryptoDetails.circulatingSupply)}`, icon: <ExclamationCircleOutlined /> },
  ];

    return (
        <div>
            <Col className='coin-detail-container'>
                <Col className='coin-heading-container'>
                    <Title className='coin-name' level={2}>
                        {cryptoDetails.name} ({cryptoDetails.slug}) Price
                    </Title>
                    <p>
                        {cryptoDetails.name} live price in $US.
                        View value statistics, market cap and supply.
                    </p>
                </Col>
                <Select
                    defaultValue='7d'
                    className='select-timeperiod'
                    placeholder='Select Timeperiod'
                    onChange={(value) => setTimePeriod(value)}
                >
                    {time.map((date) => <Option key={date}>{date}</Option>)}
                </Select>

                {/* LINE CHART */}
                <LineChart 
                    coinHistory={coinHistory} 
                    currentPrice={millify(cryptoDetails.price)} 
                    coinName={cryptoDetails.name}    
                />

                <Col className='stats-container'>
                    <Col className='coin-value-statistics'>
                        <Col className='coin-value-statistics-heading'>
                            <Title level={3} className='coin-details-heading'>
                                {cryptoDetails.name} Value Statistics
                            </Title>
                            <p>
                                An overview showing statistics of {cryptoDetails.name}, such as the base and quote currency, the rank, and trading volume.
                            </p>
                        </Col>
                        {stats.map(({ icon, title, value }) => (
                            <Col className='coin-stats'>
                                <Col className='coin-stats-name'>
                                    <Text> {icon} </Text>
                                    <Text> {title} </Text>
                                </Col>
                                <Text className='stats'> {value} </Text>
                            </Col>
                        ))}
                    </Col>
                    <Col className='other-stats-info'>
                        <Col className='coin-value-statistics-heading'>
                            <Title level={3} className='coin-details-heading'>
                                Other Statistics
                            </Title>
                            <p>
                                An overview showing statistics of all Cryptocurrencies.
                            </p>
                        </Col>
                        {genericStats.map(({ icon, title, value }) => (
                            <Col className='coin-stats'>
                                <Col className='coin-stats-name'>
                                    <Text> {icon} </Text>
                                    <Text> {title} </Text>
                                </Col>
                                <Text className='stats'> {value} </Text>
                            </Col>
                        ))}
                    </Col>
                </Col>

                <Col className='coin-desc-link'>
                    <Row className='coin-desc'>
                        <Title level={3} className='coin-details-heading'>
                            What is {cryptoDetails.name}
                            {HTMLReactParser(cryptoDetails.description)}
                        </Title>
                    </Row>
                    <Col className='coin-links'>
                        <Title level={3} className='coin-details-heading'>
                            {cryptoDetails.name} Links
                        </Title>
                        {cryptoDetails.links.map((link) => (
                            <Row className='coin-link' key={link.name}>
                                <Title level={5} className='link-name'>
                                    {link.type}
                                </Title>
                                <a href={link.urk} target='_blank' rel='noreferrer'>
                                    {link.name}
                                </a>
                            </Row>
                        ))}
                    </Col>            
                </Col>
            </Col>
        </div>
    )
}

export default CryptoDetails
