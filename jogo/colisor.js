function Colisor() {
    this.sprites = [];
    this.spritesExcluir = [];
}

Colisor.prototype = {
    novoSprite: function(sprite) {
        this.sprites.push(sprite);
        sprite.colisor = this;
    },
    processar: function() {
        for (var i in this.sprites) {
            for (var j in this.sprites) {
                // Não colidir um sprite com ele mesmo.
                if (i == j) {
                    continue;
                }
                // Abstrair a colisão.
                this.testarColisao(this.sprites[i], this.sprites[j]);
            }
        }
        this.processarExclusoes();
    },
    testarColisao: function(sprite1, sprite2) {
        // Obter os retângulos de colisão de cada sprite.
        var rets1 = sprite1.retangulosColisao();
        var rets2 = sprite2.retangulosColisao();
        // Testar as colisões entre eles.
        colisoes:
        for (var i in rets1) {
            for (var j in rets2) {
                // Ainda abstraindo a fórmula!
                if (this.retangulosColidem(rets1[i], rets2[j])) {
                    // Eles colidem, vamos notificá-los.
                    sprite1.colidiuCom(sprite2);
                    sprite2.colidiuCom(sprite1);
                    // Não precisa terminar de ver todos os retângulos.
                    break colisoes;
                }
            }
        }
    },
    retangulosColidem: function(ret1, ret2) {
        // Fórmula de interseção de retângulos.
        return (
            (ret1.x + ret1.largura) > ret2.x
            && ret1.x < (ret2.x + ret2.largura)
            && (ret1.y + ret1.altura) > ret2.y
            && ret1.y < (ret2.y + ret2.altura)
        );
    },
    excluirSprite: function(sprite) {
        this.spritesExcluir.push(sprite);
    },
    processarExclusoes: function() {
        // Criar um novo array.
        var novoArray = [];
        // Adicionar somente os elementos não excluídos.
        for (var i in this.sprites) {
            if (this.spritesExcluir.indexOf(this.sprites[i]) == -1) {
                novoArray.push(this.sprites[i]);
            }
        }
        // Limpar o array de exclusões.
        this.spritesExcluir = [];
        // Substituir o array velho pelo novo.
        this.sprites = novoArray;
    }
}
