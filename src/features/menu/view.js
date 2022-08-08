import createElement from "../appSettings/createElement";
export const View = {
    drawMenu : function(props){
        // props of an array of objs
        let elements = props;
        const mobileButtonSetting = elements.pop();
        const otherSettings = elements;
        const mobileButton = new createElement(mobileButtonSetting);
        let nav = new createElement({
            tagname : 'nav',
            attr: {
                class : "mainMenuWrap"
            },
        });
        for (const setting of otherSettings) {
            const MenuItem = new createElement(setting);
            nav.append(MenuItem);
        }
        nav.prepend(mobileButton)
        return nav;
    }
}