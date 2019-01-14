# react-ui
React JS Components
dd

## Navigation Example 
```JSX
<Navigation id="main-nav" region="east" width="260px">
    <Menu>
        <MenuItem active={route == 'dashboard'}>
        <Link path="/"><Icon className="dashboard" /><span>Dashboard</span></Link>
        <Menu>
            <MenuItem>
                <Link>This is a sub link</Link>
            </MenuItem>
            <MenuItem active={true}>
                <Link>This is a sub link</Link>
            </MenuItem>
            <MenuItem>
                <Link>This is a sub link</Link>
            </MenuItem>
        </Menu>
        </MenuItem>
        <MenuItem active={route == 'customer.list' || route == 'customer.detail'}>
            <Link path="/customers"><Icon className="customer" /><span>Customers</span></Link>
            <Menu></Menu>
        </MenuItem>
        <MenuItem active={route == 'invoice.list' || route == 'invoice.detail'}>
            <Link path="/invoices"><Icon className="invoice" /><span>Invoices</span></Link>
            <Menu></Menu>
        </MenuItem>
        <MenuItem active={route == 'coupon.list'}>
            <Link path="/coupons"><Icon className="coupon" /><span>Coupons</span></Link>
            <Menu></Menu>
        </MenuItem>
    </Menu>
</Navigation>
```
