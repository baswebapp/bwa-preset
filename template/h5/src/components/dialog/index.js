import Dialog from './index.vue';
import Vue from 'vue';

let instance = null;

/**
 * 提示框
 * @param {String} message 提示内容
 */
Dialog.alert = function(message){
   
    if(instance){
        instance.$destroy();
        instance = null;
    };

    instance = new Vue({
        render:h=>h(Dialog,{
            props:{
               
            },
            on:{
                "on-confirm":()=>{
                    instance.$destroy();
                }
            }
        },[message])
    });
    instance.$mount();
}

export default Dialog;