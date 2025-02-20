Title: Transformando pandas dataframes com wide_to_long
Slug: transformando-dataframe-com-wide-to-long
Date: 2022-07-26
Category: data-analysis
Tags: python, pandas, dataframe-reshaping
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

![Imagem com exemplo de tabelas no formato longo e amplo]({static}/images/2022/long-wide-table-example.jpg)

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
```




```python
df = pd.DataFrame({'A(weekly)-2020': [10, 23, 59, 90, 2, 8],
                   'A(weekly)-2021': [11, 77, 34, 8, 12, 45],
                   'B(weekly)-2020': [5, 44, 33, 22, 1, 32],
                   'B(weekly)-2021': [32, 56, 43, 12, 67, 44],
                   'week' : [1, 2, 3, 4, 5, 6]})

df
```





  <div id="df-14b1c82d-2b26-4bbd-a03a-9f527bc6e8c7">
    <div class="colab-df-container">
      <div>
<style scoped>
    .dataframe tbody tr th:only-of-type {
        vertical-align: middle;
    }

    .dataframe tbody tr th {
        vertical-align: top;
    }

    .dataframe thead th {
        text-align: right;
    }
</style>
<table border="1" class="dataframe">
  <thead>
    <tr style="text-align: right;">
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
      <button class="colab-df-convert" onclick="convertToInteractive('df-14b1c82d-2b26-4bbd-a03a-9f527bc6e8c7')"
              title="Convert this dataframe to an interactive table."
              style="display:none;">

  <svg xmlns="http://www.w3.org/2000/svg" height="24px"viewBox="0 0 24 24"
       width="24px">
    <path d="M0 0h24v24H0V0z" fill="none"/>
    <path d="M18.56 5.44l.94 2.06.94-2.06 2.06-.94-2.06-.94-.94-2.06-.94 2.06-2.06.94zm-11 1L8.5 8.5l.94-2.06 2.06-.94-2.06-.94L8.5 2.5l-.94 2.06-2.06.94zm10 10l.94 2.06.94-2.06 2.06-.94-2.06-.94-.94-2.06-.94 2.06-2.06.94z"/><path d="M17.41 7.96l-1.37-1.37c-.4-.4-.92-.59-1.43-.59-.52 0-1.04.2-1.43.59L10.3 9.45l-7.72 7.72c-.78.78-.78 2.05 0 2.83L4 21.41c.39.39.9.59 1.41.59.51 0 1.02-.2 1.41-.59l7.78-7.78 2.81-2.81c.8-.78.8-2.07 0-2.86zM5.41 20L4 18.59l7.72-7.72 1.47 1.35L5.41 20z"/>
  </svg>
      </button>

  <style>
    .colab-df-container {
      display:flex;
      flex-wrap:wrap;
      gap: 12px;
    }

    .colab-df-convert {
      background-color: #E8F0FE;
      border: none;
      border-radius: 50%;
      cursor: pointer;
      display: none;
      fill: #1967D2;
      height: 32px;
      padding: 0 0 0 0;
      width: 32px;
    }

    .colab-df-convert:hover {
      background-color: #E2EBFA;
      box-shadow: 0px 1px 2px rgba(60, 64, 67, 0.3), 0px 1px 3px 1px rgba(60, 64, 67, 0.15);
      fill: #174EA6;
    }

    [theme=dark] .colab-df-convert {
      background-color: #3B4455;
      fill: #D2E3FC;
    }

    [theme=dark] .colab-df-convert:hover {
      background-color: #434B5C;
      box-shadow: 0px 1px 3px 1px rgba(0, 0, 0, 0.15);
      filter: drop-shadow(0px 1px 2px rgba(0, 0, 0, 0.3));
      fill: #FFFFFF;
    }
  </style>

      <script>
        const buttonEl =
          document.querySelector('#df-14b1c82d-2b26-4bbd-a03a-9f527bc6e8c7 button.colab-df-convert');
        buttonEl.style.display =
          google.colab.kernel.accessAllowed ? 'block' : 'none';

        async function convertToInteractive(key) {
          const element = document.querySelector('#df-14b1c82d-2b26-4bbd-a03a-9f527bc6e8c7');
          const dataTable =
            await google.colab.kernel.invokeFunction('convertToInteractive',
                                                     [key], {});
          if (!dataTable) return;

          const docLinkHtml = 'Like what you see? Visit the ' +
            '<a target="_blank" href=https://colab.research.google.com/notebooks/data_table.ipynb>data table notebook</a>'
            + ' to learn more about interactive tables.';
          element.innerHTML = '';
          dataTable['output_type'] = 'display_data';
          await google.colab.output.renderOutput(dataTable, element);
          const docLink = document.createElement('div');
          docLink.innerHTML = docLinkHtml;
          element.appendChild(docLink);
        }
      </script>
    </div>
  </div>





```python
df.columns
```




    Index(['A(weekly)-2020', 'A(weekly)-2021', 'B(weekly)-2020', 'B(weekly)-2021',
           'week'],
          dtype='object')




```python
# Neste caso não seria necessário passar o valor do parâmetro `suffix` já que por padrão ele é '\d+'

pd.wide_to_long(df, stubnames=['A(weekly)', 'B(weekly)'], i='week', j='year', sep='-', suffix='\d+')
```





  <div id="df-8a64cb72-21c9-4a46-9ccb-679f68e94dc0">
    <div class="colab-df-container">
      <div>
<style scoped>
    .dataframe tbody tr th:only-of-type {
        vertical-align: middle;
    }

    .dataframe tbody tr th {
        vertical-align: top;
    }

    .dataframe thead th {
        text-align: right;
    }
</style>
<table border="1" class="dataframe">
  <thead>
    <tr style="text-align: right;">
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
      <button class="colab-df-convert" onclick="convertToInteractive('df-8a64cb72-21c9-4a46-9ccb-679f68e94dc0')"
              title="Convert this dataframe to an interactive table."
              style="display:none;">

  <svg xmlns="http://www.w3.org/2000/svg" height="24px"viewBox="0 0 24 24"
       width="24px">
    <path d="M0 0h24v24H0V0z" fill="none"/>
    <path d="M18.56 5.44l.94 2.06.94-2.06 2.06-.94-2.06-.94-.94-2.06-.94 2.06-2.06.94zm-11 1L8.5 8.5l.94-2.06 2.06-.94-2.06-.94L8.5 2.5l-.94 2.06-2.06.94zm10 10l.94 2.06.94-2.06 2.06-.94-2.06-.94-.94-2.06-.94 2.06-2.06.94z"/><path d="M17.41 7.96l-1.37-1.37c-.4-.4-.92-.59-1.43-.59-.52 0-1.04.2-1.43.59L10.3 9.45l-7.72 7.72c-.78.78-.78 2.05 0 2.83L4 21.41c.39.39.9.59 1.41.59.51 0 1.02-.2 1.41-.59l7.78-7.78 2.81-2.81c.8-.78.8-2.07 0-2.86zM5.41 20L4 18.59l7.72-7.72 1.47 1.35L5.41 20z"/>
  </svg>
      </button>

  <style>
    .colab-df-container {
      display:flex;
      flex-wrap:wrap;
      gap: 12px;
    }

    .colab-df-convert {
      background-color: #E8F0FE;
      border: none;
      border-radius: 50%;
      cursor: pointer;
      display: none;
      fill: #1967D2;
      height: 32px;
      padding: 0 0 0 0;
      width: 32px;
    }

    .colab-df-convert:hover {
      background-color: #E2EBFA;
      box-shadow: 0px 1px 2px rgba(60, 64, 67, 0.3), 0px 1px 3px 1px rgba(60, 64, 67, 0.15);
      fill: #174EA6;
    }

    [theme=dark] .colab-df-convert {
      background-color: #3B4455;
      fill: #D2E3FC;
    }

    [theme=dark] .colab-df-convert:hover {
      background-color: #434B5C;
      box-shadow: 0px 1px 3px 1px rgba(0, 0, 0, 0.15);
      filter: drop-shadow(0px 1px 2px rgba(0, 0, 0, 0.3));
      fill: #FFFFFF;
    }
  </style>

      <script>
        const buttonEl =
          document.querySelector('#df-8a64cb72-21c9-4a46-9ccb-679f68e94dc0 button.colab-df-convert');
        buttonEl.style.display =
          google.colab.kernel.accessAllowed ? 'block' : 'none';

        async function convertToInteractive(key) {
          const element = document.querySelector('#df-8a64cb72-21c9-4a46-9ccb-679f68e94dc0');
          const dataTable =
            await google.colab.kernel.invokeFunction('convertToInteractive',
                                                     [key], {});
          if (!dataTable) return;

          const docLinkHtml = 'Like what you see? Visit the ' +
            '<a target="_blank" href=https://colab.research.google.com/notebooks/data_table.ipynb>data table notebook</a>'
            + ' to learn more about interactive tables.';
          element.innerHTML = '';
          dataTable['output_type'] = 'display_data';
          await google.colab.output.renderOutput(dataTable, element);
          const docLink = document.createElement('div');
          docLink.innerHTML = docLinkHtml;
          element.appendChild(docLink);
        }
      </script>
    </div>
  </div>




Para transformar essa tabela do formato longo para o amplo (wide), podemos utilizar o método `unstack`, como mostra o exemplo a seguir.


```python
df2 = _ # captura a resposta da célula anterior

df2.unstack()
```





  <div id="df-40b3196e-ce35-4583-bf71-ed6b0b65821e">
    <div class="colab-df-container">
      <div>
<style scoped>
    .dataframe tbody tr th:only-of-type {
        vertical-align: middle;
    }

    .dataframe tbody tr th {
        vertical-align: top;
    }

    .dataframe thead tr th {
        text-align: left;
    }

    .dataframe thead tr:last-of-type th {
        text-align: right;
    }
</style>
<table border="1" class="dataframe">
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
      <button class="colab-df-convert" onclick="convertToInteractive('df-40b3196e-ce35-4583-bf71-ed6b0b65821e')"
              title="Convert this dataframe to an interactive table."
              style="display:none;">

  <svg xmlns="http://www.w3.org/2000/svg" height="24px"viewBox="0 0 24 24"
       width="24px">
    <path d="M0 0h24v24H0V0z" fill="none"/>
    <path d="M18.56 5.44l.94 2.06.94-2.06 2.06-.94-2.06-.94-.94-2.06-.94 2.06-2.06.94zm-11 1L8.5 8.5l.94-2.06 2.06-.94-2.06-.94L8.5 2.5l-.94 2.06-2.06.94zm10 10l.94 2.06.94-2.06 2.06-.94-2.06-.94-.94-2.06-.94 2.06-2.06.94z"/><path d="M17.41 7.96l-1.37-1.37c-.4-.4-.92-.59-1.43-.59-.52 0-1.04.2-1.43.59L10.3 9.45l-7.72 7.72c-.78.78-.78 2.05 0 2.83L4 21.41c.39.39.9.59 1.41.59.51 0 1.02-.2 1.41-.59l7.78-7.78 2.81-2.81c.8-.78.8-2.07 0-2.86zM5.41 20L4 18.59l7.72-7.72 1.47 1.35L5.41 20z"/>
  </svg>
      </button>

  <style>
    .colab-df-container {
      display:flex;
      flex-wrap:wrap;
      gap: 12px;
    }

    .colab-df-convert {
      background-color: #E8F0FE;
      border: none;
      border-radius: 50%;
      cursor: pointer;
      display: none;
      fill: #1967D2;
      height: 32px;
      padding: 0 0 0 0;
      width: 32px;
    }

    .colab-df-convert:hover {
      background-color: #E2EBFA;
      box-shadow: 0px 1px 2px rgba(60, 64, 67, 0.3), 0px 1px 3px 1px rgba(60, 64, 67, 0.15);
      fill: #174EA6;
    }

    [theme=dark] .colab-df-convert {
      background-color: #3B4455;
      fill: #D2E3FC;
    }

    [theme=dark] .colab-df-convert:hover {
      background-color: #434B5C;
      box-shadow: 0px 1px 3px 1px rgba(0, 0, 0, 0.15);
      filter: drop-shadow(0px 1px 2px rgba(0, 0, 0, 0.3));
      fill: #FFFFFF;
    }
  </style>

      <script>
        const buttonEl =
          document.querySelector('#df-40b3196e-ce35-4583-bf71-ed6b0b65821e button.colab-df-convert');
        buttonEl.style.display =
          google.colab.kernel.accessAllowed ? 'block' : 'none';

        async function convertToInteractive(key) {
          const element = document.querySelector('#df-40b3196e-ce35-4583-bf71-ed6b0b65821e');
          const dataTable =
            await google.colab.kernel.invokeFunction('convertToInteractive',
                                                     [key], {});
          if (!dataTable) return;

          const docLinkHtml = 'Like what you see? Visit the ' +
            '<a target="_blank" href=https://colab.research.google.com/notebooks/data_table.ipynb>data table notebook</a>'
            + ' to learn more about interactive tables.';
          element.innerHTML = '';
          dataTable['output_type'] = 'display_data';
          await google.colab.output.renderOutput(dataTable, element);
          const docLink = document.createElement('div');
          docLink.innerHTML = docLinkHtml;
          element.appendChild(docLink);
        }
      </script>
    </div>
  </div>




### Um exemplo avançado do uso do parâmetro `suffix`

A página da documentação menciona rapidamente um caso de uso alternativo para o uso parâmetro `suffix`. Na verdade, essa menção encontra-se na própria descrição do parâmetro `suffix`.

Imagine que temos dois produtos ‘A’ e ‘B’ e três canais de anúncio: TV, internet e rádio. Agora, digamos que estejamos interessados somente nos dados para dois canais de anúncio: TV e internet. 

Podemos utilizar o poder das expressões regulares para transformar os dados referente a esses dois canais de vendas e deixar o terceiro intacto. 

Neste caso, basta definir o parâmetro `suffix` com o seguinte valor `suffix=‘(tv|internet)’`.



```python
df3 = pd.DataFrame({'A-tv': np.random.randint(0, 100, size=5),
                   'A-internet': np.random.randint(0, 100, size=5),
                   'B-tv': np.random.randint(0, 100, size=5),
                   'B-internet': np.random.randint(0, 100, size=5),
                   'B-radio': np.random.randint(0, 100, size=5),
                   'id' : np.arange(5)
                   })
df3
```





  <div id="df-170f846c-1846-4a75-a861-65ad48bb8e94">
    <div class="colab-df-container">
      <div>
<style scoped>
    .dataframe tbody tr th:only-of-type {
        vertical-align: middle;
    }

    .dataframe tbody tr th {
        vertical-align: top;
    }

    .dataframe thead th {
        text-align: right;
    }
</style>
<table border="1" class="dataframe">
  <thead>
    <tr style="text-align: right;">
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
      <button class="colab-df-convert" onclick="convertToInteractive('df-170f846c-1846-4a75-a861-65ad48bb8e94')"
              title="Convert this dataframe to an interactive table."
              style="display:none;">

  <svg xmlns="http://www.w3.org/2000/svg" height="24px"viewBox="0 0 24 24"
       width="24px">
    <path d="M0 0h24v24H0V0z" fill="none"/>
    <path d="M18.56 5.44l.94 2.06.94-2.06 2.06-.94-2.06-.94-.94-2.06-.94 2.06-2.06.94zm-11 1L8.5 8.5l.94-2.06 2.06-.94-2.06-.94L8.5 2.5l-.94 2.06-2.06.94zm10 10l.94 2.06.94-2.06 2.06-.94-2.06-.94-.94-2.06-.94 2.06-2.06.94z"/><path d="M17.41 7.96l-1.37-1.37c-.4-.4-.92-.59-1.43-.59-.52 0-1.04.2-1.43.59L10.3 9.45l-7.72 7.72c-.78.78-.78 2.05 0 2.83L4 21.41c.39.39.9.59 1.41.59.51 0 1.02-.2 1.41-.59l7.78-7.78 2.81-2.81c.8-.78.8-2.07 0-2.86zM5.41 20L4 18.59l7.72-7.72 1.47 1.35L5.41 20z"/>
  </svg>
      </button>

  <style>
    .colab-df-container {
      display:flex;
      flex-wrap:wrap;
      gap: 12px;
    }

    .colab-df-convert {
      background-color: #E8F0FE;
      border: none;
      border-radius: 50%;
      cursor: pointer;
      display: none;
      fill: #1967D2;
      height: 32px;
      padding: 0 0 0 0;
      width: 32px;
    }

    .colab-df-convert:hover {
      background-color: #E2EBFA;
      box-shadow: 0px 1px 2px rgba(60, 64, 67, 0.3), 0px 1px 3px 1px rgba(60, 64, 67, 0.15);
      fill: #174EA6;
    }

    [theme=dark] .colab-df-convert {
      background-color: #3B4455;
      fill: #D2E3FC;
    }

    [theme=dark] .colab-df-convert:hover {
      background-color: #434B5C;
      box-shadow: 0px 1px 3px 1px rgba(0, 0, 0, 0.15);
      filter: drop-shadow(0px 1px 2px rgba(0, 0, 0, 0.3));
      fill: #FFFFFF;
    }
  </style>

      <script>
        const buttonEl =
          document.querySelector('#df-170f846c-1846-4a75-a861-65ad48bb8e94 button.colab-df-convert');
        buttonEl.style.display =
          google.colab.kernel.accessAllowed ? 'block' : 'none';

        async function convertToInteractive(key) {
          const element = document.querySelector('#df-170f846c-1846-4a75-a861-65ad48bb8e94');
          const dataTable =
            await google.colab.kernel.invokeFunction('convertToInteractive',
                                                     [key], {});
          if (!dataTable) return;

          const docLinkHtml = 'Like what you see? Visit the ' +
            '<a target="_blank" href=https://colab.research.google.com/notebooks/data_table.ipynb>data table notebook</a>'
            + ' to learn more about interactive tables.';
          element.innerHTML = '';
          dataTable['output_type'] = 'display_data';
          await google.colab.output.renderOutput(dataTable, element);
          const docLink = document.createElement('div');
          docLink.innerHTML = docLinkHtml;
          element.appendChild(docLink);
        }
      </script>
    </div>
  </div>





```python
pd.wide_to_long(df3, stubnames=['A', 'B'], i='id', j='type', sep='-', suffix='(tv|internet)')
```





  <div id="df-41da72f8-dc3d-4f0f-ad82-89b7e05e30d8">
    <div class="colab-df-container">
      <div>
<style scoped>
    .dataframe tbody tr th:only-of-type {
        vertical-align: middle;
    }

    .dataframe tbody tr th {
        vertical-align: top;
    }

    .dataframe thead th {
        text-align: right;
    }
</style>
<table border="1" class="dataframe">
  <thead>
    <tr style="text-align: right;">
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
      <button class="colab-df-convert" onclick="convertToInteractive('df-41da72f8-dc3d-4f0f-ad82-89b7e05e30d8')"
              title="Convert this dataframe to an interactive table."
              style="display:none;">

  <svg xmlns="http://www.w3.org/2000/svg" height="24px"viewBox="0 0 24 24"
       width="24px">
    <path d="M0 0h24v24H0V0z" fill="none"/>
    <path d="M18.56 5.44l.94 2.06.94-2.06 2.06-.94-2.06-.94-.94-2.06-.94 2.06-2.06.94zm-11 1L8.5 8.5l.94-2.06 2.06-.94-2.06-.94L8.5 2.5l-.94 2.06-2.06.94zm10 10l.94 2.06.94-2.06 2.06-.94-2.06-.94-.94-2.06-.94 2.06-2.06.94z"/><path d="M17.41 7.96l-1.37-1.37c-.4-.4-.92-.59-1.43-.59-.52 0-1.04.2-1.43.59L10.3 9.45l-7.72 7.72c-.78.78-.78 2.05 0 2.83L4 21.41c.39.39.9.59 1.41.59.51 0 1.02-.2 1.41-.59l7.78-7.78 2.81-2.81c.8-.78.8-2.07 0-2.86zM5.41 20L4 18.59l7.72-7.72 1.47 1.35L5.41 20z"/>
  </svg>
      </button>

  <style>
    .colab-df-container {
      display:flex;
      flex-wrap:wrap;
      gap: 12px;
    }

    .colab-df-convert {
      background-color: #E8F0FE;
      border: none;
      border-radius: 50%;
      cursor: pointer;
      display: none;
      fill: #1967D2;
      height: 32px;
      padding: 0 0 0 0;
      width: 32px;
    }

    .colab-df-convert:hover {
      background-color: #E2EBFA;
      box-shadow: 0px 1px 2px rgba(60, 64, 67, 0.3), 0px 1px 3px 1px rgba(60, 64, 67, 0.15);
      fill: #174EA6;
    }

    [theme=dark] .colab-df-convert {
      background-color: #3B4455;
      fill: #D2E3FC;
    }

    [theme=dark] .colab-df-convert:hover {
      background-color: #434B5C;
      box-shadow: 0px 1px 3px 1px rgba(0, 0, 0, 0.15);
      filter: drop-shadow(0px 1px 2px rgba(0, 0, 0, 0.3));
      fill: #FFFFFF;
    }
  </style>

      <script>
        const buttonEl =
          document.querySelector('#df-41da72f8-dc3d-4f0f-ad82-89b7e05e30d8 button.colab-df-convert');
        buttonEl.style.display =
          google.colab.kernel.accessAllowed ? 'block' : 'none';

        async function convertToInteractive(key) {
          const element = document.querySelector('#df-41da72f8-dc3d-4f0f-ad82-89b7e05e30d8');
          const dataTable =
            await google.colab.kernel.invokeFunction('convertToInteractive',
                                                     [key], {});
          if (!dataTable) return;

          const docLinkHtml = 'Like what you see? Visit the ' +
            '<a target="_blank" href=https://colab.research.google.com/notebooks/data_table.ipynb>data table notebook</a>'
            + ' to learn more about interactive tables.';
          element.innerHTML = '';
          dataTable['output_type'] = 'display_data';
          await google.colab.output.renderOutput(dataTable, element);
          const docLink = document.createElement('div');
          docLink.innerHTML = docLinkHtml;
          element.appendChild(docLink);
        }
      </script>
    </div>
  </div>




Note que a coluna ‘B-radio’ ainda persiste no resultado final. Se não a desejamos, bastar aplicar o método `drop` nessa coluna.


```python
(pd.wide_to_long(df3, 
                    stubnames=['A', 'B'], 
                    i='id', 
                    j='type', 
                    sep='-', 
                    suffix='(tv|internet)')
                .drop('B-radio', axis='columns'))
```





  <div id="df-ff2d824c-0a98-4ee6-842c-5f342c1f91a2">
    <div class="colab-df-container">
      <div>
<style scoped>
    .dataframe tbody tr th:only-of-type {
        vertical-align: middle;
    }

    .dataframe tbody tr th {
        vertical-align: top;
    }

    .dataframe thead th {
        text-align: right;
    }
</style>
<table border="1" class="dataframe">
  <thead>
    <tr style="text-align: right;">
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
      <button class="colab-df-convert" onclick="convertToInteractive('df-ff2d824c-0a98-4ee6-842c-5f342c1f91a2')"
              title="Convert this dataframe to an interactive table."
              style="display:none;">

  <svg xmlns="http://www.w3.org/2000/svg" height="24px"viewBox="0 0 24 24"
       width="24px">
    <path d="M0 0h24v24H0V0z" fill="none"/>
    <path d="M18.56 5.44l.94 2.06.94-2.06 2.06-.94-2.06-.94-.94-2.06-.94 2.06-2.06.94zm-11 1L8.5 8.5l.94-2.06 2.06-.94-2.06-.94L8.5 2.5l-.94 2.06-2.06.94zm10 10l.94 2.06.94-2.06 2.06-.94-2.06-.94-.94-2.06-.94 2.06-2.06.94z"/><path d="M17.41 7.96l-1.37-1.37c-.4-.4-.92-.59-1.43-.59-.52 0-1.04.2-1.43.59L10.3 9.45l-7.72 7.72c-.78.78-.78 2.05 0 2.83L4 21.41c.39.39.9.59 1.41.59.51 0 1.02-.2 1.41-.59l7.78-7.78 2.81-2.81c.8-.78.8-2.07 0-2.86zM5.41 20L4 18.59l7.72-7.72 1.47 1.35L5.41 20z"/>
  </svg>
      </button>

  <style>
    .colab-df-container {
      display:flex;
      flex-wrap:wrap;
      gap: 12px;
    }

    .colab-df-convert {
      background-color: #E8F0FE;
      border: none;
      border-radius: 50%;
      cursor: pointer;
      display: none;
      fill: #1967D2;
      height: 32px;
      padding: 0 0 0 0;
      width: 32px;
    }

    .colab-df-convert:hover {
      background-color: #E2EBFA;
      box-shadow: 0px 1px 2px rgba(60, 64, 67, 0.3), 0px 1px 3px 1px rgba(60, 64, 67, 0.15);
      fill: #174EA6;
    }

    [theme=dark] .colab-df-convert {
      background-color: #3B4455;
      fill: #D2E3FC;
    }

    [theme=dark] .colab-df-convert:hover {
      background-color: #434B5C;
      box-shadow: 0px 1px 3px 1px rgba(0, 0, 0, 0.15);
      filter: drop-shadow(0px 1px 2px rgba(0, 0, 0, 0.3));
      fill: #FFFFFF;
    }
  </style>

      <script>
        const buttonEl =
          document.querySelector('#df-ff2d824c-0a98-4ee6-842c-5f342c1f91a2 button.colab-df-convert');
        buttonEl.style.display =
          google.colab.kernel.accessAllowed ? 'block' : 'none';

        async function convertToInteractive(key) {
          const element = document.querySelector('#df-ff2d824c-0a98-4ee6-842c-5f342c1f91a2');
          const dataTable =
            await google.colab.kernel.invokeFunction('convertToInteractive',
                                                     [key], {});
          if (!dataTable) return;

          const docLinkHtml = 'Like what you see? Visit the ' +
            '<a target="_blank" href=https://colab.research.google.com/notebooks/data_table.ipynb>data table notebook</a>'
            + ' to learn more about interactive tables.';
          element.innerHTML = '';
          dataTable['output_type'] = 'display_data';
          await google.colab.output.renderOutput(dataTable, element);
          const docLink = document.createElement('div');
          docLink.innerHTML = docLinkHtml;
          element.appendChild(docLink);
        }
      </script>
    </div>
  </div>




## Dica para definir `sutbnames` com expressões regulares

Um outro exemplo rapidamente mencionado na documentação, é utilizar expressões regulares para identificar os prefixos de forma programática.

Por exemplo, voltemos ao dataframe do primeiro exemplo.


```python
df
```





  <div id="df-9ea3b5f4-e1f2-42ae-aaf9-2d469077ce6d">
    <div class="colab-df-container">
      <div>
<style scoped>
    .dataframe tbody tr th:only-of-type {
        vertical-align: middle;
    }

    .dataframe tbody tr th {
        vertical-align: top;
    }

    .dataframe thead th {
        text-align: right;
    }
</style>
<table border="1" class="dataframe">
  <thead>
    <tr style="text-align: right;">
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
      <button class="colab-df-convert" onclick="convertToInteractive('df-9ea3b5f4-e1f2-42ae-aaf9-2d469077ce6d')"
              title="Convert this dataframe to an interactive table."
              style="display:none;">

  <svg xmlns="http://www.w3.org/2000/svg" height="24px"viewBox="0 0 24 24"
       width="24px">
    <path d="M0 0h24v24H0V0z" fill="none"/>
    <path d="M18.56 5.44l.94 2.06.94-2.06 2.06-.94-2.06-.94-.94-2.06-.94 2.06-2.06.94zm-11 1L8.5 8.5l.94-2.06 2.06-.94-2.06-.94L8.5 2.5l-.94 2.06-2.06.94zm10 10l.94 2.06.94-2.06 2.06-.94-2.06-.94-.94-2.06-.94 2.06-2.06.94z"/><path d="M17.41 7.96l-1.37-1.37c-.4-.4-.92-.59-1.43-.59-.52 0-1.04.2-1.43.59L10.3 9.45l-7.72 7.72c-.78.78-.78 2.05 0 2.83L4 21.41c.39.39.9.59 1.41.59.51 0 1.02-.2 1.41-.59l7.78-7.78 2.81-2.81c.8-.78.8-2.07 0-2.86zM5.41 20L4 18.59l7.72-7.72 1.47 1.35L5.41 20z"/>
  </svg>
      </button>

  <style>
    .colab-df-container {
      display:flex;
      flex-wrap:wrap;
      gap: 12px;
    }

    .colab-df-convert {
      background-color: #E8F0FE;
      border: none;
      border-radius: 50%;
      cursor: pointer;
      display: none;
      fill: #1967D2;
      height: 32px;
      padding: 0 0 0 0;
      width: 32px;
    }

    .colab-df-convert:hover {
      background-color: #E2EBFA;
      box-shadow: 0px 1px 2px rgba(60, 64, 67, 0.3), 0px 1px 3px 1px rgba(60, 64, 67, 0.15);
      fill: #174EA6;
    }

    [theme=dark] .colab-df-convert {
      background-color: #3B4455;
      fill: #D2E3FC;
    }

    [theme=dark] .colab-df-convert:hover {
      background-color: #434B5C;
      box-shadow: 0px 1px 3px 1px rgba(0, 0, 0, 0.15);
      filter: drop-shadow(0px 1px 2px rgba(0, 0, 0, 0.3));
      fill: #FFFFFF;
    }
  </style>

      <script>
        const buttonEl =
          document.querySelector('#df-9ea3b5f4-e1f2-42ae-aaf9-2d469077ce6d button.colab-df-convert');
        buttonEl.style.display =
          google.colab.kernel.accessAllowed ? 'block' : 'none';

        async function convertToInteractive(key) {
          const element = document.querySelector('#df-9ea3b5f4-e1f2-42ae-aaf9-2d469077ce6d');
          const dataTable =
            await google.colab.kernel.invokeFunction('convertToInteractive',
                                                     [key], {});
          if (!dataTable) return;

          const docLinkHtml = 'Like what you see? Visit the ' +
            '<a target="_blank" href=https://colab.research.google.com/notebooks/data_table.ipynb>data table notebook</a>'
            + ' to learn more about interactive tables.';
          element.innerHTML = '';
          dataTable['output_type'] = 'display_data';
          await google.colab.output.renderOutput(dataTable, element);
          const docLink = document.createElement('div');
          docLink.innerHTML = docLinkHtml;
          element.appendChild(docLink);
        }
      </script>
    </div>
  </div>




Poderíamos encontrar os valores dos prefixos utilizando o seguinte código:


```python
stubnames = sorted(
    set([match[0] for match in df.columns.str.findall(
        r'[A-B]\(.*\)').values if match != [] ])
)

stubnames
```




    ['A(weekly)', 'B(weekly)']



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
