import React, { Component } from 'react';
import axios from 'axios';
import {xml_Json} from '../utils/index';
import Item from './Item';

class App extends Component {
    constructor(props){
        super(props);
        this.state = {
            isShowSearch: false,
            searchString: '',
            data: []
        }
        this.fetchData = this.fetchData.bind(this);
        this.showSearch = this.showSearch.bind(this);
        this._handleKeyPress = this._handleKeyPress.bind(this);
        this._handleChange = this._handleChange.bind(this);
    }   

    fetchData (){
        const {searchString} =this.state;
        if (!searchString) return;
        axios.post(`https://en.wikipedia.org/w/api.php?origin=*&action=opensearch&search=${encodeURI(searchString)}&prop=info&format=xml&inprop=url HTTP/1.1\r\n`)
        .then(({data})=>{
            if (!data) return;            
            const oParser = new DOMParser();
            const oDOM = oParser.parseFromString(data, "application/xml");
            const obj = xml_Json(oDOM);    
            if (Object.keys(obj.SearchSuggestion.Section).length){
                this.setState({data: obj.SearchSuggestion.Section.Item, searchString: ''});                
            }
            
        })
        .catch((err)=>{
            console.log(err)
        });    
    }
    
    showSearch(){
        this.setState({isShowSearch: !this.state.isShowSearch, searchString: '', data: {}});
    }
    _handleKeyPress(e) {       
        if (e.key === 'Enter') {
            this.fetchData();
            return;
        }        
    }
    _handleChange(e){
        this.setState({searchString: e.target.value});
    }
    
    render() {
        const {isShowSearch, searchString, data} = this.state;
        return (
            <div className='app'>
                <div className={data.length ? "wrapper data" : "wrapper"}>
                    <a className="white-text" href="https://en.wikipedia.org/wiki/Special:Random" target="_blank">
                        Click here for a random article
                    </a>
                    <br/>
                    {
                        !isShowSearch ? 
                            <i className="fas fa-search icon some fa-3x" onClick={this.showSearch}></i>
                            :
                            <div className='form'>
                                <input type="text" 
                                    className="search"
                                    onKeyPress={this._handleKeyPress}
                                    onChange={this._handleChange}
                                    value={searchString}
                                     />
                                <i className="fas fa-times icon fa-2x icon-search" 
                                    onClick={this.showSearch}>                                  
                                </i>
                            </div>
                    }
                    <div className='wrap-items'>
                        <div className='b-items'>
                            {
                                !data.length ?
                                    <p className="white-text hide" id="help">Click icon to search</p>
                                :
                                    data.map((item, key)=> <Item item={item} key={key}/>)
                            }
                        </div>    
                    </div>                                    
                </div>        
            </div>
        );
    }
}

export default App;