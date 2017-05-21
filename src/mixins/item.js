import wepy from 'wepy';

export default class ItemMixin extends wepy.mixin {

    data = {
        list: [],
        lastId: 0,
        requestList: () => {}
    };
    methods = {
       async loadMore(){
            await this.getList(this.lastId);
        }
    };

    handleItem(item){
        if (!wepy.$isEmpty(item)){
            item.tag = '';
            switch (item.category){
                case '1':
                    try {
                        item.tag = item.tag_list[0].title;
                    }catch (e){
                        item.tag = '阅读';
                    }
                    break;
                case '2':
                    item.tag = '连载';
                    break;
                case '3':
                    item.tag = '问答';
                    break;
                case '4':
                    item.tag = '音乐';
                    break;
                case '5':
                    item.tag = '影视';
                    item.movieFrom = "———《" + (item.subtitle).substring(3, (item.subtitle).length) +"》";
                    break;
            }
        }
    }

    handleList(){
        this.list.forEach((item) => {
            this.handleItem(item);
        });
        let length = this.list.length;
        this.lastId = length ? this.list[length - 1].id : -1;
        this.$apply();
    }

    async getList(id = 0){
        let res = await this.requestList({query: {id}});
        if (res.statusCode === 200){
            let data = res.data;
            if(data.res === 0){
                this.list = this.list.concat(data.data);
                this.$apply();
                this.handleList();
            }
        }
    }


    loadMore(e){
        console.log(e, 'loadMore');
    }

    async onLoad() {
        await this.getList(0);
    }
}