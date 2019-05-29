import React from 'react';
import {Switch, Route} from 'react-router-dom';
import Home from './components/Home';
import Layout from './hoc/Layout';
import RegisterLogin from './components/Register_login';
import Register from './components/Register_login/register';
import UserDashboard from './components/UserDashboard';
import Auth from './hoc/Auth';
import Shop from './components/Shop';
import AddProduct from "./components/UserDashboard/Admin/AddProduct";
import ManageCategories from './components/UserDashboard/Admin/ManageCategories';



const Routes = () =>{
    return(
        <Layout>
            <Switch>
                {/*
                for complete private routes the 2nd argument is true,
                for complete public routes the 2nd argument is null,
                for inbetween the 2nd argument is false
                */}
                <Route exact path="/user/dashboard" component={Auth(UserDashboard, true)}/>
                <Route exact path="/admin/add_product" component={Auth(AddProduct, true)}/>
                <Route exact path="/admin/manage_categories" component={Auth(ManageCategories, true)}/>

                <Route path="/register_login" component={Auth(RegisterLogin, false)}/>
                <Route exact path="/register" component={Auth(Register, false)} />
                <Route exact path="/shop" component={Auth(Shop, null)}/>
                <Route exact path="/" component={Auth(Home, null)}/>
            </Switch>
        </Layout>
    );
};

export default Routes;
