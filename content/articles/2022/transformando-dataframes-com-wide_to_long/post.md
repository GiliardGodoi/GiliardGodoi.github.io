Title: Transformando pandas dataframes com wide_to_long
Slug: transformando-dataframe-com-wide-to-long
Date: 2022-07-26
Category: data-analysis
Tags: python, pandas, reshaping
Author: Giliard Godoi
Summary: Quando os nomes das colunas guardam informações que podem ser importantes

## TL;DR

- Formato wide table
- Formato long table
- Para que serve a função `pd.wide_to_long`
- Parâmetros da função
- Exemplos
- Outros métodos e funções relacionados.

Documentação: [`pd.wide_to_long`](https://pandas.pydata.org/pandas-docs/stable/reference/api/pandas.wide_to_long.html)

Exemplos mencionados no artigo também estão disponíveis no Google Collab.


## Introdução
Este artigo discute a utilização da função `pd.wide_to_long` da biblioteca [Pandas](https://pandas.pydata.org/).
“Wide tables” e “long tables” referem-se a como os dados estão organizados nas tabelas. Não sei se existe uma tradução melhor, mas eu vou adotar os conceitos de tabela no formato amplo (wide) e tabela no formato longo (long).

## Formato wide table (Formato amplo?)
A organização da tabela no formato amplo é, possivelmente, o que mais naturalmente vem a mente quando pensamos em tabelas.

Esse formato possui as seguintes características:

- Cada linha corresponde a uma observação de um fenômeno (dados de uma pessoa, de uma transação bancária, etc.)
- Cada coluna guarda o valor de um respectivo atributo dessa observação. Por exemplo, no caso de uma pessoa, poderíamos ter uma coluna para a altura, outra para o peso, outra para a data de nascimento.


## Formato long table
Já no formato longo os atributos de uma observação (isto é, o que seria as colunas) estão organizados como registros de uma tabela, isto é, distribuídos pelas linhas da tabela.
Um exemplo básico seria esse:

![Imagem com exemplo de tabelas no formato longo e amplo](./long-wide-table-example.jpg)

## Mas para que serve a função `pd.wide_to_long`?

O próximo exemplo é baseado em um exemplo existente na documentação, mas eu inventei um contexto a mais para esses dados.

No mundo real, e pelas mais diferentes razões, os dados podem estar organizados nas mais variadas formas.

Imagine por exemplo, que por alguma razão, os nomes das colunas de uma tabela codificam uma informação importante, e queiramos utilizar essa informação como valores na nossa tabela.

Por exemplo, imagine a seguinte tabela com informações sobre a quantidade de vendas de dois produtos ‘A’ e ‘B’, durante cinco semanas dos anos de 2020 e 2021.

Os dados estão organizados na tabela com as seguintes colunas:

    'A(weekly)-2020', 'A(weekly)-2021', 'B(weekly)-2020', 'B(weekly)-2021', 'week'

As colunas com informações do produto seguem o seguinte padrão: A ou B para identificar o produto seguido da expressão (weekly); um carácter de separação ‘-’; mais o valor que representa o ano (2020 ou 2021).

Os nomes das colunas podem ser divididos em duas partes que, para seguir a nomeação dada pela documentação, chamaremos de prefixo e sufixo.

Os prefixos seriam as expressões ‘A(weekly)’ e ‘B(weekly)’ que codificam a informação do tipo do produto.

Já os sufixos seriam os valores para os anos: 2020 e 2021.

Então, antes de seguir a leitura, note que identificamos nos nomes das colunas:

- Um prefixo: ‘A(weekly)’ e ‘B(weekly)’
- Um carácter de separação: ‘-’
- Um sufixo: os valores


## Parâmetros da função

De acordo com a documentação, a função `pd.wide_to_long` possui os seguintes parâmetros:

- df é o dataframe a ser transformado.
- stubnames (str ou uma lista) indica os valores dos prefixos presentes nos nomes das colunas, que serão utilizados para transformar o dataframe. Uma definição da palavra *stub* pode ser encontrada no [dicionário Cambridge](https://dictionary.cambridge.org/dictionary/english/stub);
- i (str ou uma lista) indica as colunas que serão utilizadas com identificadores (id) das observações, essas colunas serão transformadas em índices do dataframe retornado.
- j (str) : indica o nome da coluna que será criada com os valores identificados pelos sufixos
- sep : indica o caractere de separação entre os prefixos e os sufixos dos nomes das colunas.
- suffix: aceita uma expressão regular que será utilizada para a identificação dos sufixos;
   - O valor padrão é `\d+` que captura valores numéricos.
   - Esse parâmetro pode ser alterado para `\w+` que captura strings

Particularmente, eu tenho a impressão que a biblioteca pandas poderia ser muito mais consistente na escolha dos nomes dos parâmetros. Porém, eu entendo que o desenvolvimento de qualquer software é uma atividade dinâmica que envolve diversas pessoas, durante um longo período de tempo, e ter essa consistência não é uma tarefa simples.

De qualquer forma, eu não acho que o nome desses parâmetros (i e j) sejam bons indicadores do que eles são. Repare que o parâmetro i pode receber uma string ou uma lista, mas o parâmetro `j` só recebe uma string, que é o nome da nova (e única) coluna criada. À primeira vista, isso pareceu meio confuso para mim.

## Exemplos de uso




```python
import pandas as pd
import numpy as np

>> df = pd.DataFrame({'A(weekly)-2020': [10, 23, 59, 90, 2, 8],
                   'A(weekly)-2021': [11, 77, 34, 8, 12, 45],
                   'B(weekly)-2020': [5, 44, 33, 22, 1, 32],
                   'B(weekly)-2021': [32, 56, 43, 12, 67, 44],
                   'week' : [1, 2, 3, 4, 5, 6]})

>> df
```
<div class='table-responsive'>
<table border="0" class="dataframe">
  <thead>
    <tr>
      <th></th>
      <th>A(weekly)-2020</th>
      <th>A(weekly)-2021</th>
      <th>B(weekly)-2020</th>
      <th>B(weekly)-2021</th>
      <th>week</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>0</th>
      <td>10</td>
      <td>11</td>
      <td>5</td>
      <td>32</td>
      <td>1</td>
    </tr>
    <tr>
      <th>1</th>
      <td>23</td>
      <td>77</td>
      <td>44</td>
      <td>56</td>
      <td>2</td>
    </tr>
    <tr>
      <th>2</th>
      <td>59</td>
      <td>34</td>
      <td>33</td>
      <td>43</td>
      <td>3</td>
    </tr>
    <tr>
      <th>3</th>
      <td>90</td>
      <td>8</td>
      <td>22</td>
      <td>12</td>
      <td>4</td>
    </tr>
    <tr>
      <th>4</th>
      <td>2</td>
      <td>12</td>
      <td>1</td>
      <td>67</td>
      <td>5</td>
    </tr>
    <tr>
      <th>5</th>
      <td>8</td>
      <td>45</td>
      <td>32</td>
      <td>44</td>
      <td>6</td>
    </tr>
  </tbody>
</table>
</div>

```python
>> df.columns
Index([
  'A(weekly)-2020',
  'A(weekly)-2021',
  'B(weekly)-2020',
  'B(weekly)-2021',
  'week'],
dtype='object')

# Neste caso não seria necessário passar o valor do parâmetro `suffix` já que por padrão ele é '\d+'

pd.wide_to_long(df,
                stubnames=['A(weekly)', 'B(weekly)'],
                i='week',
                j='year',
                sep='-',
                suffix='\d+'
              )
```
<div class='table-responsive'>
<table border="0" class="dataframe">
  <thead>
    <tr>
      <th></th>
      <th></th>
      <th>A(weekly)</th>
      <th>B(weekly)</th>
    </tr>
    <tr>
      <th>week</th>
      <th>year</th>
      <th></th>
      <th></th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>1</th>
      <th>2020</th>
      <td>10</td>
      <td>5</td>
    </tr>
    <tr>
      <th>2</th>
      <th>2020</th>
      <td>23</td>
      <td>44</td>
    </tr>
    <tr>
      <th>3</th>
      <th>2020</th>
      <td>59</td>
      <td>33</td>
    </tr>
    <tr>
      <th>4</th>
      <th>2020</th>
      <td>90</td>
      <td>22</td>
    </tr>
    <tr>
      <th>5</th>
      <th>2020</th>
      <td>2</td>
      <td>1</td>
    </tr>
    <tr>
      <th>6</th>
      <th>2020</th>
      <td>8</td>
      <td>32</td>
    </tr>
    <tr>
      <th>1</th>
      <th>2021</th>
      <td>11</td>
      <td>32</td>
    </tr>
    <tr>
      <th>2</th>
      <th>2021</th>
      <td>77</td>
      <td>56</td>
    </tr>
    <tr>
      <th>3</th>
      <th>2021</th>
      <td>34</td>
      <td>43</td>
    </tr>
    <tr>
      <th>4</th>
      <th>2021</th>
      <td>8</td>
      <td>12</td>
    </tr>
    <tr>
      <th>5</th>
      <th>2021</th>
      <td>12</td>
      <td>67</td>
    </tr>
    <tr>
      <th>6</th>
      <th>2021</th>
      <td>45</td>
      <td>44</td>
    </tr>
  </tbody>
</table>
</div>

Para transformar essa tabela do formato longo para o amplo (wide), podemos utilizar o método `.unstack`, como mostra o exemplo a seguir.


```python
>> df2 = _ # captura a resposta da célula anterior
>> df2.unstack()
```
<div class='table-responsive'>
<table border="0" class="dataframe">
  <thead>
    <tr>
      <th></th>
      <th colspan="2" halign="left">A(weekly)</th>
      <th colspan="2" halign="left">B(weekly)</th>
    </tr>
    <tr>
      <th>year</th>
      <th>2020</th>
      <th>2021</th>
      <th>2020</th>
      <th>2021</th>
    </tr>
    <tr>
      <th>week</th>
      <th></th>
      <th></th>
      <th></th>
      <th></th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>1</th>
      <td>10</td>
      <td>11</td>
      <td>5</td>
      <td>32</td>
    </tr>
    <tr>
      <th>2</th>
      <td>23</td>
      <td>77</td>
      <td>44</td>
      <td>56</td>
    </tr>
    <tr>
      <th>3</th>
      <td>59</td>
      <td>34</td>
      <td>33</td>
      <td>43</td>
    </tr>
    <tr>
      <th>4</th>
      <td>90</td>
      <td>8</td>
      <td>22</td>
      <td>12</td>
    </tr>
    <tr>
      <th>5</th>
      <td>2</td>
      <td>12</td>
      <td>1</td>
      <td>67</td>
    </tr>
    <tr>
      <th>6</th>
      <td>8</td>
      <td>45</td>
      <td>32</td>
      <td>44</td>
    </tr>
  </tbody>
</table>
</div>

## Um exemplo avançado do uso do parâmetro `suffix`

A página da documentação menciona rapidamente um caso de uso alternativo para o uso parâmetro `suffix`. Na verdade, essa menção encontra-se na própria descrição do parâmetro `suffix`.

Imagine que temos dois produtos ‘A’ e ‘B’ e três canais de anúncio: TV, internet e rádio. Agora, digamos que estejamos interessados somente nos dados para dois canais de anúncio: TV e internet.

Podemos utilizar o poder das expressões regulares para transformar os dados referente a esses dois canais de vendas e deixar o terceiro intacto.

Neste caso, basta definir o parâmetro `suffix` com o seguinte valor `suffix=‘(tv|internet)’`.



```python
>> df3 = pd.DataFrame({'A-tv': np.random.randint(0, 100, size=5),
                   'A-internet': np.random.randint(0, 100, size=5),
                   'B-tv': np.random.randint(0, 100, size=5),
                   'B-internet': np.random.randint(0, 100, size=5),
                   'B-radio': np.random.randint(0, 100, size=5),
                   'id' : np.arange(5)
                   })
>> df3
```

<div class='table-responsive'>
<table border="0" class="dataframe">
  <thead>
    <tr>
      <th></th>
      <th>A-tv</th>
      <th>A-internet</th>
      <th>B-tv</th>
      <th>B-internet</th>
      <th>B-radio</th>
      <th>id</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>0</th>
      <td>15</td>
      <td>4</td>
      <td>57</td>
      <td>76</td>
      <td>10</td>
      <td>0</td>
    </tr>
    <tr>
      <th>1</th>
      <td>40</td>
      <td>19</td>
      <td>78</td>
      <td>1</td>
      <td>17</td>
      <td>1</td>
    </tr>
    <tr>
      <th>2</th>
      <td>15</td>
      <td>93</td>
      <td>67</td>
      <td>27</td>
      <td>1</td>
      <td>2</td>
    </tr>
    <tr>
      <th>3</th>
      <td>37</td>
      <td>19</td>
      <td>21</td>
      <td>89</td>
      <td>3</td>
      <td>3</td>
    </tr>
    <tr>
      <th>4</th>
      <td>5</td>
      <td>5</td>
      <td>78</td>
      <td>63</td>
      <td>59</td>
      <td>4</td>
    </tr>
  </tbody>
</table>
</div>

```python
pd.wide_to_long(df3,
                stubnames=['A', 'B'],
                i='id',
                j='type',
                sep='-',
                suffix='(tv|internet)'
              )
```

<div class='table-responsive'>
<table border="0" class="dataframe">
  <thead>
    <tr>
      <th></th>
      <th></th>
      <th>B-radio</th>
      <th>A</th>
      <th>B</th>
    </tr>
    <tr>
      <th>id</th>
      <th>type</th>
      <th></th>
      <th></th>
      <th></th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>0</th>
      <th>tv</th>
      <td>10</td>
      <td>15</td>
      <td>57</td>
    </tr>
    <tr>
      <th>1</th>
      <th>tv</th>
      <td>17</td>
      <td>40</td>
      <td>78</td>
    </tr>
    <tr>
      <th>2</th>
      <th>tv</th>
      <td>1</td>
      <td>15</td>
      <td>67</td>
    </tr>
    <tr>
      <th>3</th>
      <th>tv</th>
      <td>3</td>
      <td>37</td>
      <td>21</td>
    </tr>
    <tr>
      <th>4</th>
      <th>tv</th>
      <td>59</td>
      <td>5</td>
      <td>78</td>
    </tr>
    <tr>
      <th>0</th>
      <th>internet</th>
      <td>10</td>
      <td>4</td>
      <td>76</td>
    </tr>
    <tr>
      <th>1</th>
      <th>internet</th>
      <td>17</td>
      <td>19</td>
      <td>1</td>
    </tr>
    <tr>
      <th>2</th>
      <th>internet</th>
      <td>1</td>
      <td>93</td>
      <td>27</td>
    </tr>
    <tr>
      <th>3</th>
      <th>internet</th>
      <td>3</td>
      <td>19</td>
      <td>89</td>
    </tr>
    <tr>
      <th>4</th>
      <th>internet</th>
      <td>59</td>
      <td>5</td>
      <td>63</td>
    </tr>
  </tbody>
</table>
</div>

Note que a coluna 'B-radio' ainda persiste no resultado final. Se não a desejamos, bastar aplicar o método `drop` nessa coluna.


```python
(pd.wide_to_long(df3,
                    stubnames=['A', 'B'],
                    i='id',
                    j='type',
                    sep='-',
                    suffix='(tv|internet)')
                .drop('B-radio', axis='columns'))
```

<div class='table-responsive'>
<table border="0" class="dataframe">
  <thead>
    <tr>
      <th></th>
      <th></th>
      <th>A</th>
      <th>B</th>
    </tr>
    <tr>
      <th>id</th>
      <th>type</th>
      <th></th>
      <th></th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>0</th>
      <th>tv</th>
      <td>15</td>
      <td>57</td>
    </tr>
    <tr>
      <th>1</th>
      <th>tv</th>
      <td>40</td>
      <td>78</td>
    </tr>
    <tr>
      <th>2</th>
      <th>tv</th>
      <td>15</td>
      <td>67</td>
    </tr>
    <tr>
      <th>3</th>
      <th>tv</th>
      <td>37</td>
      <td>21</td>
    </tr>
    <tr>
      <th>4</th>
      <th>tv</th>
      <td>5</td>
      <td>78</td>
    </tr>
    <tr>
      <th>0</th>
      <th>internet</th>
      <td>4</td>
      <td>76</td>
    </tr>
    <tr>
      <th>1</th>
      <th>internet</th>
      <td>19</td>
      <td>1</td>
    </tr>
    <tr>
      <th>2</th>
      <th>internet</th>
      <td>93</td>
      <td>27</td>
    </tr>
    <tr>
      <th>3</th>
      <th>internet</th>
      <td>19</td>
      <td>89</td>
    </tr>
    <tr>
      <th>4</th>
      <th>internet</th>
      <td>5</td>
      <td>63</td>
    </tr>
  </tbody>
</table>
</div>

## Dica para definir `sutbnames` com expressões regulares

Um outro exemplo rapidamente mencionado na documentação, é utilizar expressões regulares para identificar os prefixos de forma programática.

Por exemplo, voltemos ao dataframe do primeiro exemplo.


```python
>> df
```
<div class='table-responsive'>
<table border="1" class="dataframe">
  <thead>
    <tr>
      <th></th>
      <th>A(weekly)-2020</th>
      <th>A(weekly)-2021</th>
      <th>B(weekly)-2020</th>
      <th>B(weekly)-2021</th>
      <th>week</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>0</th>
      <td>10</td>
      <td>11</td>
      <td>5</td>
      <td>32</td>
      <td>1</td>
    </tr>
    <tr>
      <th>1</th>
      <td>23</td>
      <td>77</td>
      <td>44</td>
      <td>56</td>
      <td>2</td>
    </tr>
    <tr>
      <th>2</th>
      <td>59</td>
      <td>34</td>
      <td>33</td>
      <td>43</td>
      <td>3</td>
    </tr>
    <tr>
      <th>3</th>
      <td>90</td>
      <td>8</td>
      <td>22</td>
      <td>12</td>
      <td>4</td>
    </tr>
    <tr>
      <th>4</th>
      <td>2</td>
      <td>12</td>
      <td>1</td>
      <td>67</td>
      <td>5</td>
    </tr>
    <tr>
      <th>5</th>
      <td>8</td>
      <td>45</td>
      <td>32</td>
      <td>44</td>
      <td>6</td>
    </tr>
  </tbody>
</table>
</div>

Poderíamos encontrar os valores dos prefixos utilizando o seguinte código:


```python
>> stubnames = sorted(
              set(
                  [ match[0]
                    for match in df.columns.str.findall(r'[A-B]\(.*\)').values
                    if match != [] ]
                  )
)

>> stubnames
    ['A(weekly)', 'B(weekly)']
```

## Outras funções para transformação de um dataframe

A biblioteca pandas também oferece outras funções para alterar a estrutura de um dataframe conforme as nossas necessidades.

- `pd.melt` - converte um dataframe do formato wide para o formato longo.
- `pd.pivot` - pode converter um dataframe do formato longo para wide.
- `dataframe.pivot_table` - possui quase a mesma função que a função `pd.pivot` porém realiza operações de agregação de dados por exemplo, calcular uma média, mediana, realizar uma contagem.
- `dataframe.stack` empilha colunas em índices;
- `dataframe.unstack` desempilha índices em colunas.

## Conclusão

Neste rápido tutorial, vimos o uso da função `pd.wide_to_long`.

Eu pessoalmente não conhecia essa função até bem pouco tempo atrás. Talvez porque o problema que essa função se propõe a resolver seja bem específico.
