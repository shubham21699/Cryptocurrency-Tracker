import React from 'react'
import { Button, Menu, Avatar, Typography } from 'antd';
import { Link } from 'react-router-dom';
import { HomeOutlined, MoneyCollectOutlined, BulbOutlined, FundOutlined, MenuOutlined } from '@ant-design/icons';
import icon from '../images/cryptocurrency.png';

const Navbar = () => {
    return (
        <div className='navbar-container'>
            <div className='logo-container'>
                <Avatar src={icon} size="large" />
                <Typography.Title className='logo' level={2}>
                    <Link to="/">Crypto Tracker</Link>
                </Typography.Title>
                <Menu theme='dark'>
                    <Menu.Item icon={<HomeOutlined />}>
                        <Link to='/'>Home</Link>
                    </Menu.Item>
                    <Menu.Item icon={<FundOutlined />}>
                        <Link to='/cryptocurrencies'>Cryptocurrencies</Link>
                    </Menu.Item>
                    <Menu.Item icon={<MoneyCollectOutlined />}>
                        <Link to='/exchanges'>Exchanges</Link>
                    </Menu.Item>
                    <Menu.Item icon={<BulbOutlined />}>
                        <Link to='/news'>Crypto World News</Link>
                    </Menu.Item>
                </Menu>
            </div>
        </div>
    )
}

export default Navbar
