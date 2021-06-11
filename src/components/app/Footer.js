import React from 'react'
import {createFromIconfontCN} from '@ant-design/icons'
import {NavLink} from "react-router-dom";

const IconFont = createFromIconfontCN({
    scriptUrl: '//at.alicdn.com/t/font_8d5l8fzk5b87iudi.js',
})

const Footer = () => {
    return (
        <>
            <div className="footer" style={{backgroundColor: '#34E4BA'}}>
                <div className={`footer-main`}>
                    <div>
                        <img className={`footer-logo`} src={`/images/NTL.png`} alt="123333"/>
                        <div className="icons-list" style={{marginTop: '10px'}}>
                            <a href={'https://www.facebook.com/ntl.group.logistic/'} target="_blank">
                                <img src={`/images/facebook.png`}
                                     style={{fontSize: '24px', marginRight: '20px', width: '24px'}} alt=""/>
                            </a>
                            <a href={'https://www.instagram.com/ntl_logistic/'} target="_blank">
                                <img src={`/images/instagram.png`}
                                     style={{fontSize: '24px', marginRight: '20px', width: '24px'}} alt=""/>
                            </a>
                            <a href={'https://www.ntl.group/'} target="_blank">
                                <img src={`/images/telegram.png`}
                                     style={{fontSize: '24px', marginRight: '20px', width: '24px'}} alt=""/>
                            </a>
                        </div>
                    </div>
                    <div className={'footer-titles'}>NTL Group - это гарант надёжности и качества для вашего
                        бизнеса. <br/>
                        Предоставляем все виды логистических услуг - профессионально, <br/> быстро и качествено.
                    </div>
                    <div className={'footer-titles'}>
                        Контакты:
                        Улица Сухаил
                        Дом 9 А
                        Ташкент, Узбекистан
                        <br/>
                        контактный номер: +998999870333
                        <br/>
                        email: info@ntl.group
                    </div>
                    <br/>
                </div>
            </div>
        </>
    );
}

export default Footer
