export const Helper = {
    extractStyle: function(props){
        props = Object.assign({}, props, props.style);

        delete props.style;
        delete props.className;

        return props;
    }
};
