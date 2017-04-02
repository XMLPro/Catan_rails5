/* eslint no-console: 0 */
// Run this example by adding <%= javascript_pack_tag 'hello_vue' %>
// to the head of your layout file,
// like app/views/layouts/application.html.erb.
// All it does is render <div>Hello Vue</div> at the bottom of the page.

import Vue from 'vue/dist/vue.esm'

const NONE = 0, BLACK = 1, WHITE = 2
class MBCell{
    constructor() {
        this.status = 0
    }

    to_s(){
        switch(this.status){
            case BLACK:
                return "o"
            case WHITE:
                return "x"
            default:
                return ""
        }
    }
}

const SIZE = 3
function mb_init(data){
    data.length = 0
    for(let i of new Array(SIZE)) {
        let inner_data = []
        for(let j of new Array(SIZE)) {
            inner_data.push(new MBCell())
        }
        data.push(inner_data)
    }
}

let mb_data = []
mb_init(mb_data)

function check_win(){
    // 縦( | )
    let result = null
    for(let i = 0; i < SIZE; i++){
        for(let j = 0; j < SIZE; j++){
            let target = mb_data[j][i].status
            if(result == null || result == target){
                result = target
            } else {
                result = null
                break
            }

            if(j == SIZE - 1) {
                return target
            }
        }
    }

    // 横( ─ )
    for(let i = 0; i < SIZE; i++){
        for(let j = 0; j < SIZE; j++){
            let target = mb_data[i][j].status
            if(result == null || result == target){
                result = target
            } else {
                result = null
                break
            }

            if(j == SIZE - 1) {
                return target
            }
        }
    }

    // 右肩( ／ )
    for(let i = 0; i < SIZE; i++){
        let target = mb_data[i][i].status
        if(result == null || result == target){
            result = target
        } else {
            result = null
            break
        }

        if(i == SIZE - 1) {
            return target
        }
    }

    // 左肩( ＼ )
    for(let i = 0; i < SIZE; i++){
        let target = mb_data[i][SIZE - 1 - i].status
        if(result == null || result == target){
            result = target
        } else {
            result = null
            break
        }

        if(i == SIZE - 1) {
            return target
        }
    }

    // 引き分け
    outer:
    for(let i = 0; i < SIZE; i++){
        for(let j = 0; j < SIZE; j++){
            result = mb_data[i][j].status
            if(result == NONE) {
                break outer
            }
        }
    }
    return result == NONE ? NONE : -1
}

var mb = new Vue({
    el: '#mb',
    data: {
        rows: mb_data,
        turn: true,
        winner: null
    },
    computed: {
        mbData: function() {
            return mb_data
        },
        turnName: function() {
            return this.turn ? '赤' : '青'
        },
        winnerName: function() {
            return this.winner || ''
        }
    },
    methods: {
        mbClick: function(cell){
            if(cell.status == NONE && this.winner == null) {
                cell.status = this.turn ? BLACK : WHITE
                this.turn = !this.turn

                let winner = check_win()
                switch(winner) {
                    case BLACK:
                        this.winner = '赤'
                        break
                    case WHITE:
                        this.winner = '青'
                        break
                    case NONE:
                        break
                    default:
                        this.winner = '引き分け'
                        break
                }
            }
        },
        restart: function(e){
            mb_init(mb_data)
            this.winner = null
            this.turn = true
        }
    }
})
