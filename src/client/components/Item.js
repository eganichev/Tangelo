import React from 'react';

const Item = ({item}) => {
    return (
        <div className='b-item'>
            <a href={item.Url['#text']} target="_blank">
                <h1 className='title'>
                    {item.Text['#text']}
                </h1>
                <div className='description'>
                    {item.Description['#text']}
                </div>
            </a>
        </div>
    );
};

export default Item;