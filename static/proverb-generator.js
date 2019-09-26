/*
The MIT License (MIT)

Copyright (c) 2015 duarte-pompeu

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
*/

var PROVERBS_1 = "A cavalo dado, não se olha o dente.|A casamento e a baptizado, não vás sem ser convidado.|Água mole em pedra dura, tando bate até que fura.|A galinha da vizinha, é sempre melhor que a minha.|A verdade é como o azeite, vem sempre ao de cima.|Cada um por si, Deus por todos.|De boas intenções, está o Inferno cheio.|Deitar cedo e cedo erguer, dá saúde e faz crescer.|Diz o roto ao nu, porque não te vestes tu?|Diz-me com quem andas, dir-te-ei quem tu és.|Em Abril, águas mil.|Em casa sem pão, todos ralham e ninguém tem razão.|Em Outubro sê prudente, guarda o pão e guarda a semente.|Em tempo de guerra, todo o buraco é trincheira.|Entre marido e mulher, não se mete a colher.|Ladrão que rouba a ladrão, tem 1000 anos de perdão.|Filho de peixe, sabe nadar.|Gaivotas em terra, temporal no mar.|Galinha que canta, faca na garganta.|Gato escaldado, de água fria tem medo.|Grão a grão, enche a galinha o papo.|Há mar e mar, há ir e voltar.|Maio frio e Junho quente, bom pão e vinho valente.|Mulher que assobia, ou capa porcos ou trai o marido.|Nevoeiro na serra, chuva na terra.|A cavalo dado, não se olha o dente.|Olho por olho, dente por dente.|Para dar e receber, muito rico é preciso ser.|Para bom entendedor, meia palavra pasta.|Para grandes males, grandes remédios.|Patrão fora, dia santo na loja.|Quando a esmola é grande, o pobre desconfia.|Se o velho pudesse e o novo quisesse, nada havia que não se fizesse.|Zangam-se as comadres, descobrem-se as verdades.";
var PROVERBS_2 = "Quem acompanha coxo, ao terceiro dia coxeia.|Quem semeia ventos, colhe tempestades.|Quem diz a verdade, não merece castigo.|Quem conta um conto, acrescenta-lhe um ponto.|Quem está de fora, não racha lenha.|Quem muito se abaixa, o cu se lhe vê.|Quem espera, sempre alcança.|Quem cala, consente.|Quem anda à chuva, molha-se.|Quem brinca com o fogo, queima-se.|Quem diz a verdade, não marece castigo.|Quem deve a Pedro e paga a Gaspar, volta a pagar.|Quem é surdo, guarda segredos.|Quem está de fora, não racha lenha.|Quem madruga, Deus ajuda.|Quem mais jura, mais mente.|Quem não tem cão, caça com gato.|Quem sabe do barco, é o barqueiro.|Quem te avisa, teu amigo é.|Quem tem cu, tem medo.|Quem tem telhados de vidro, não deve atirar pedras ao vizinho.|Quem vai ao mar, avia-se em terra.|Quem vê caras, não vê corações.";

var ALL_PROVERBS = [];

ALL_PROVERBS.push(PROVERBS_1);
ALL_PROVERBS.push(PROVERBS_2);

var LAST_PROVERBS = [];

LAST_PROVERBS.push("");
LAST_PROVERBS.push("");

function print_proverbs(){
	var proverb = get_proverb();
	print_proverb(proverb);
	
	reset_src();
}
function get_proverb(){
	// 1. Pick variable
	
	var i = randint(2);
	var proverbs = ALL_PROVERBS[i].split("|");
	
	n_proverbs = proverbs.length;
	var rand1 = randint(n_proverbs);
	var rand2 = randint(n_proverbs);
	
	var proverb1 = proverbs[rand1];
	var proverb2 = proverbs[rand2];
	
	update_last_proverbs(proverb1, proverb2);
	
	var new_prov_pt1 = proverb1.split(",")[0];
	var new_prov_pt2 = proverb2.split(",")[1];
	
	return new_prov_pt1 + "," + new_prov_pt2;
}

function update_last_proverbs(p1, p2){
	LAST_PROVERBS = [];
	LAST_PROVERBS.push(p1);
	LAST_PROVERBS.push(p2);
}

function get_last_proverbs(){
	return LAST_PROVERBS;
}

function randint(max){
	return Math.floor(Math.random() * (max));
}