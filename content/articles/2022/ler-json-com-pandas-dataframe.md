Title: Lendo dados no formato JSON com pandas
Slug: ler-json-com-pandas-dataframe
Date: 2022-08-15
Category: data-analysis
Tags: python, pandas, json
Author: Giliard Godoi
Summary: Conheça funções úteis da biblioteca pandas para trabalhar com dados no formato JSON

## O que é JSON?

*JavaScript Object Notation* (JSON) é uma representação de dados baseado em chave-valor, seguindo a sintaxe dos objetos da linguagem JavaScript.
Popularizou-se como uma forma de transmissão de dados pela Web, como uma alternativa à estrutura XML.

Outras linguagens também oferecem suporte para se trabalhar com dados nesse formato. Por exemplo, a biblioteca nativa [`json`](https://docs.python.org/3/library/json.html) permite converter strings no formato JSON para dicionários da linguagem Python.

Para que essa conversão seja possível, é necessário estabelecer uma relação entre os tipos primitivos dessas duas linguagens. Essa correspondência é bastante simples pois ambas as linguagem oferecem um tipo primitivo para strings (texto), valores numéricos (inteiros e floats), tipos booleanos (True, False) e listas, dicionários e o valor nulo (Null no caso do JavaScript e None no caso do Python).

Nesse artigo, veremos como transformar dados em JSON em dataframes em quatro exemplos.
- Um exemplo básico;
- Um exemplo intermediário
- Um exemplo avançado;
- E um exemplo um pouco mais avançado.


O exemplo de dados no formato JSON utilizado nesse artigo é adaptado daquele presente na página de documentação da [Mozilla Web Docs](https://developer.mozilla.org/pt-BR/docs/Learn/JavaScript/Objects/JSON), e que pode ser consultado nesse link.



## Exemplo básico

Nesse primeiro exemplo, transformaremos a string no formato JSON em um dicionário em Python utilizando a biblioteca nativa `json`.


```python
import json
```

A variável `single_character` é string com um único objeto no formato JSON. Esse objeto temos as chaves `'name'`, `'age'`, `'secretIdentity'` e `'powers'`, e seus respectivos valores.

Note que o valor correspondente a chave `'powers'` é uma lista de strings. O uso de listas (ou *arrays* do JavaScript) codifica uma relação de um-para-muitos. No caso, um super-heroí possui vários poderes.


```python
single_character = '''
{
      "name": "Molecule Man",
      "age": 29,
      "secretIdentity": "Dan Jukes",
      "powers": [
        "Radiation resistance",
        "Turning tiny",
        "Radiation blast"
      ]
    }
'''

superhero = json.loads(single_character)
```

Podemos transformar (ou decodificar) esses dados em um dicionário Python utilizando a função `json.loads`. E magicamente, temos um dicionário.


```python
superhero
```




    {'name': 'Molecule Man',
     'age': 29,
     'secretIdentity': 'Dan Jukes',
     'powers': ['Radiation resistance', 'Turning tiny', 'Radiation blast']}



Um pandas Dataframe pode ser construído a partir de uma lista de dicionários. Mas se passarmos esse simples dicionário `superhero` para o construtor do dataframe, também obtemos um dataframe.


```python
import pandas as pd
```


```python
pd.DataFrame(superhero)
```




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
      <th>name</th>
      <th>age</th>
      <th>secretIdentity</th>
      <th>powers</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>0</th>
      <td>Molecule Man</td>
      <td>29</td>
      <td>Dan Jukes</td>
      <td>Radiation resistance</td>
    </tr>
    <tr>
      <th>1</th>
      <td>Molecule Man</td>
      <td>29</td>
      <td>Dan Jukes</td>
      <td>Turning tiny</td>
    </tr>
    <tr>
      <th>2</th>
      <td>Molecule Man</td>
      <td>29</td>
      <td>Dan Jukes</td>
      <td>Radiation blast</td>
    </tr>
  </tbody>
</table>
</div>



Note que o atributo `powers`, que codifica uma lista de três poderes, e ele se desdobra em três registros (linhas).

Porém, esse mesmo resultado pode ser obtido utilizando a função [`pd.read_json`](https://pandas.pydata.org/pandas-docs/stable/reference/api/pandas.read_json.html)


```python
pd.read_json(single_character)
```




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
      <th>name</th>
      <th>age</th>
      <th>secretIdentity</th>
      <th>powers</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>0</th>
      <td>Molecule Man</td>
      <td>29</td>
      <td>Dan Jukes</td>
      <td>Radiation resistance</td>
    </tr>
    <tr>
      <th>1</th>
      <td>Molecule Man</td>
      <td>29</td>
      <td>Dan Jukes</td>
      <td>Turning tiny</td>
    </tr>
    <tr>
      <th>2</th>
      <td>Molecule Man</td>
      <td>29</td>
      <td>Dan Jukes</td>
      <td>Radiation blast</td>
    </tr>
  </tbody>
</table>
</div>



## Exemplo Intermediário

Nesse próximo exemplo, a variável `squad` é uma lista de heróis, e ainda temos o mesmo atributo `powers` com uma lista de poderes para esses heróis.


```python
squad = '''
 [
    {
      "name": "Molecule Man",
      "age": 29,
      "secretIdentity": "Dan Jukes",
      "powers": [
        "Radiation resistance",
        "Turning tiny",
        "Radiation blast"
      ]
    },
    {
      "name": "Madame Uppercut",
      "age": 39,
      "secretIdentity": "Jane Wilson",
      "powers": [
        "Million tonne punch",
        "Damage resistance",
        "Superhuman reflexes"
      ]
    },
    {
      "name": "Eternal Flame",
      "age": 1000000,
      "secretIdentity": "Unknown",
      "powers": [
        "Immortality",
        "Heat Immunity",
        "Inferno",
        "Teleportation",
        "Interdimensional travel"
      ]
    }
  ]
'''
```

Nesse caso função `pd.read_json` não desdobra os valores da coluna `powers`. Os valores dessa coluna são diversas listas.


```python
pd.read_json(squad)
```




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
      <th>name</th>
      <th>age</th>
      <th>secretIdentity</th>
      <th>powers</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>0</th>
      <td>Molecule Man</td>
      <td>29</td>
      <td>Dan Jukes</td>
      <td>[Radiation resistance, Turning tiny, Radiation...</td>
    </tr>
    <tr>
      <th>1</th>
      <td>Madame Uppercut</td>
      <td>39</td>
      <td>Jane Wilson</td>
      <td>[Million tonne punch, Damage resistance, Super...</td>
    </tr>
    <tr>
      <th>2</th>
      <td>Eternal Flame</td>
      <td>1000000</td>
      <td>Unknown</td>
      <td>[Immortality, Heat Immunity, Inferno, Teleport...</td>
    </tr>
  </tbody>
</table>
</div>



Caso se queira desdobrar esse relacionamento um-para-vários, é possível utilizar o método [`explode`](https://pandas.pydata.org/pandas-docs/stable/reference/api/pandas.DataFrame.explode.html).


```python
pd.read_json(squad).explode('powers')
```




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
      <th>name</th>
      <th>age</th>
      <th>secretIdentity</th>
      <th>powers</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>0</th>
      <td>Molecule Man</td>
      <td>29</td>
      <td>Dan Jukes</td>
      <td>Radiation resistance</td>
    </tr>
    <tr>
      <th>0</th>
      <td>Molecule Man</td>
      <td>29</td>
      <td>Dan Jukes</td>
      <td>Turning tiny</td>
    </tr>
    <tr>
      <th>0</th>
      <td>Molecule Man</td>
      <td>29</td>
      <td>Dan Jukes</td>
      <td>Radiation blast</td>
    </tr>
    <tr>
      <th>1</th>
      <td>Madame Uppercut</td>
      <td>39</td>
      <td>Jane Wilson</td>
      <td>Million tonne punch</td>
    </tr>
    <tr>
      <th>1</th>
      <td>Madame Uppercut</td>
      <td>39</td>
      <td>Jane Wilson</td>
      <td>Damage resistance</td>
    </tr>
    <tr>
      <th>1</th>
      <td>Madame Uppercut</td>
      <td>39</td>
      <td>Jane Wilson</td>
      <td>Superhuman reflexes</td>
    </tr>
    <tr>
      <th>2</th>
      <td>Eternal Flame</td>
      <td>1000000</td>
      <td>Unknown</td>
      <td>Immortality</td>
    </tr>
    <tr>
      <th>2</th>
      <td>Eternal Flame</td>
      <td>1000000</td>
      <td>Unknown</td>
      <td>Heat Immunity</td>
    </tr>
    <tr>
      <th>2</th>
      <td>Eternal Flame</td>
      <td>1000000</td>
      <td>Unknown</td>
      <td>Inferno</td>
    </tr>
    <tr>
      <th>2</th>
      <td>Eternal Flame</td>
      <td>1000000</td>
      <td>Unknown</td>
      <td>Teleportation</td>
    </tr>
    <tr>
      <th>2</th>
      <td>Eternal Flame</td>
      <td>1000000</td>
      <td>Unknown</td>
      <td>Interdimensional travel</td>
    </tr>
  </tbody>
</table>
</div>



## Exemplo Avançado

No próximo exemplo, os temos as informações do esquadrão de super-heróis: nomes, cidade, ano de formação, base secreta, além da relação de membros.

Novamente temos uma relação de um-para-muitos: um esquadrão e vários super-heróis. Nesse exemplo, vamos omitir a relação um-para-muitos entre heróis e poderes.


```python
squad_advanced = '''{
  "squadName": "Super hero squad",
  "homeTown": "Metro City",
  "formed": 2016,
  "secretBase": "Super tower",
  "active": true,
  "members": [
    {
      "name": "Molecule Man",
      "age": 29,
      "secretIdentity": "Dan Jukes",
      "powers" : "molecule powers"
    },
    {
      "name": "Madame Uppercut",
      "age": 39,
      "secretIdentity": "Jane Wilson",
      "powers" : "badass"
    },
    {
      "name": "Eternal Flame",
      "age": 1000000,
      "secretIdentity": "Unknown",
      "powers" : "flame"
    }
  ]
}
'''
```

O dataframe resultante da função `pd.read_json` possui os atributos do esquadrão nome, cidade, ano de formação, base secreta e se está ou não em atividade.

Os valores da coluna `members` no entanto, são dicionários correspondentes aos super-heróis.


```python
pd.read_json(squad_advanced)
```




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
      <th>squadName</th>
      <th>homeTown</th>
      <th>formed</th>
      <th>secretBase</th>
      <th>active</th>
      <th>members</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>0</th>
      <td>Super hero squad</td>
      <td>Metro City</td>
      <td>2016</td>
      <td>Super tower</td>
      <td>True</td>
      <td>{'name': 'Molecule Man', 'age': 29, 'secretIde...</td>
    </tr>
    <tr>
      <th>1</th>
      <td>Super hero squad</td>
      <td>Metro City</td>
      <td>2016</td>
      <td>Super tower</td>
      <td>True</td>
      <td>{'name': 'Madame Uppercut', 'age': 39, 'secret...</td>
    </tr>
    <tr>
      <th>2</th>
      <td>Super hero squad</td>
      <td>Metro City</td>
      <td>2016</td>
      <td>Super tower</td>
      <td>True</td>
      <td>{'name': 'Eternal Flame', 'age': 1000000, 'sec...</td>
    </tr>
  </tbody>
</table>
</div>



Ao utilizar o método `explode` para desdobrar essa relação os valores da coluna `members` corresponderá às chaves dos dicionários. 

Muito provavelmente, esse não é o resultado esperado para as nossas análises, conforme podemos ver.


```python
pd.read_json(squad_advanced).explode('members')
```




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
      <th>squadName</th>
      <th>homeTown</th>
      <th>formed</th>
      <th>secretBase</th>
      <th>active</th>
      <th>members</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>0</th>
      <td>Super hero squad</td>
      <td>Metro City</td>
      <td>2016</td>
      <td>Super tower</td>
      <td>True</td>
      <td>name</td>
    </tr>
    <tr>
      <th>0</th>
      <td>Super hero squad</td>
      <td>Metro City</td>
      <td>2016</td>
      <td>Super tower</td>
      <td>True</td>
      <td>age</td>
    </tr>
    <tr>
      <th>0</th>
      <td>Super hero squad</td>
      <td>Metro City</td>
      <td>2016</td>
      <td>Super tower</td>
      <td>True</td>
      <td>secretIdentity</td>
    </tr>
    <tr>
      <th>0</th>
      <td>Super hero squad</td>
      <td>Metro City</td>
      <td>2016</td>
      <td>Super tower</td>
      <td>True</td>
      <td>powers</td>
    </tr>
    <tr>
      <th>1</th>
      <td>Super hero squad</td>
      <td>Metro City</td>
      <td>2016</td>
      <td>Super tower</td>
      <td>True</td>
      <td>name</td>
    </tr>
    <tr>
      <th>1</th>
      <td>Super hero squad</td>
      <td>Metro City</td>
      <td>2016</td>
      <td>Super tower</td>
      <td>True</td>
      <td>age</td>
    </tr>
    <tr>
      <th>1</th>
      <td>Super hero squad</td>
      <td>Metro City</td>
      <td>2016</td>
      <td>Super tower</td>
      <td>True</td>
      <td>secretIdentity</td>
    </tr>
    <tr>
      <th>1</th>
      <td>Super hero squad</td>
      <td>Metro City</td>
      <td>2016</td>
      <td>Super tower</td>
      <td>True</td>
      <td>powers</td>
    </tr>
    <tr>
      <th>2</th>
      <td>Super hero squad</td>
      <td>Metro City</td>
      <td>2016</td>
      <td>Super tower</td>
      <td>True</td>
      <td>name</td>
    </tr>
    <tr>
      <th>2</th>
      <td>Super hero squad</td>
      <td>Metro City</td>
      <td>2016</td>
      <td>Super tower</td>
      <td>True</td>
      <td>age</td>
    </tr>
    <tr>
      <th>2</th>
      <td>Super hero squad</td>
      <td>Metro City</td>
      <td>2016</td>
      <td>Super tower</td>
      <td>True</td>
      <td>secretIdentity</td>
    </tr>
    <tr>
      <th>2</th>
      <td>Super hero squad</td>
      <td>Metro City</td>
      <td>2016</td>
      <td>Super tower</td>
      <td>True</td>
      <td>powers</td>
    </tr>
  </tbody>
</table>
</div>



Nesses casos podemos utilizar a função [`pd.json_normalize`](https://pandas.pydata.org/pandas-docs/stable/reference/api/pandas.json_normalize.html) para obter melhores resultados.

Contudo, essa função aceita dicionários Python, por isso é necessário utilizar a função `json.loads` para decodificar os dados JSON. 

Essa função recebe o parâmetro `record_paths` que indica qual é o atributo principal dos dados, nesse caso o atributo `members` com informações dos nossos três super-heróis.


```python
squad_dict = json.loads(squad_advanced)

pd.json_normalize(squad_dict, record_path='members')
```




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
      <th>name</th>
      <th>age</th>
      <th>secretIdentity</th>
      <th>powers</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>0</th>
      <td>Molecule Man</td>
      <td>29</td>
      <td>Dan Jukes</td>
      <td>molecule powers</td>
    </tr>
    <tr>
      <th>1</th>
      <td>Madame Uppercut</td>
      <td>39</td>
      <td>Jane Wilson</td>
      <td>badass</td>
    </tr>
    <tr>
      <th>2</th>
      <td>Eternal Flame</td>
      <td>1000000</td>
      <td>Unknown</td>
      <td>flame</td>
    </tr>
  </tbody>
</table>
</div>



Para manter os atributos que se refere às informações do esquadrão, utilizamos os parâmetros `meta` e passamos a lista de atributos que queremos manter.

Note que os valores desses atributos são repetidos para cada um dos três super-heróis.


```python
pd.json_normalize(squad_dict, 
                  record_path='members', 
                  meta=['squadName', 'homeTown', 'secretBase'])
```




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
      <th>name</th>
      <th>age</th>
      <th>secretIdentity</th>
      <th>powers</th>
      <th>squadName</th>
      <th>homeTown</th>
      <th>secretBase</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>0</th>
      <td>Molecule Man</td>
      <td>29</td>
      <td>Dan Jukes</td>
      <td>molecule powers</td>
      <td>Super hero squad</td>
      <td>Metro City</td>
      <td>Super tower</td>
    </tr>
    <tr>
      <th>1</th>
      <td>Madame Uppercut</td>
      <td>39</td>
      <td>Jane Wilson</td>
      <td>badass</td>
      <td>Super hero squad</td>
      <td>Metro City</td>
      <td>Super tower</td>
    </tr>
    <tr>
      <th>2</th>
      <td>Eternal Flame</td>
      <td>1000000</td>
      <td>Unknown</td>
      <td>flame</td>
      <td>Super hero squad</td>
      <td>Metro City</td>
      <td>Super tower</td>
    </tr>
  </tbody>
</table>
</div>



## Um exemplo um pouco mais avançado

Nesse último caso, vamos unir o que aprendemos nos dois últimos exemplos. Para tanto, voltamos com a relação um-para-vários presente no atributo `powers`.


```python
squad_more_advanced = '''
{
  "squadName": "Super hero squad",
  "homeTown": "Metro City",
  "formed": 2016,
  "secretBase": "Super tower",
  "active": true,
  "members": [
    {
      "name": "Molecule Man",
      "age": 29,
      "secretIdentity": "Dan Jukes",
      "powers": [
        "Radiation resistance",
        "Turning tiny",
        "Radiation blast"
      ]
    },
    {
      "name": "Madame Uppercut",
      "age": 39,
      "secretIdentity": "Jane Wilson",
      "powers": [
        "Million tonne punch",
        "Damage resistance",
        "Superhuman reflexes"
      ]
    },
    {
      "name": "Eternal Flame",
      "age": 1000000,
      "secretIdentity": "Unknown",
      "powers": [
        "Immortality",
        "Heat Immunity",
        "Inferno",
        "Teleportation",
        "Interdimensional travel"
      ]
    }
  ]
}
'''
```

Então, seguimos os mesmos passos:


1.   Decodificamos os dados em JSON em dicionários;
2.   Utilizamos a função `pd.json_normalize` definindo os parâmetros `record_paths` para chave que contém os nossos principais dados, e `meta` para aquelas chaves que queremos manter;


```python
squad_dict_2 = json.loads(squad_more_advanced)

df = pd.json_normalize(squad_dict_2, 
                  record_path='members', 
                  meta=['squadName', 'homeTown', 'secretBase'])

df
```




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
      <th>name</th>
      <th>age</th>
      <th>secretIdentity</th>
      <th>powers</th>
      <th>squadName</th>
      <th>homeTown</th>
      <th>secretBase</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>0</th>
      <td>Molecule Man</td>
      <td>29</td>
      <td>Dan Jukes</td>
      <td>[Radiation resistance, Turning tiny, Radiation...</td>
      <td>Super hero squad</td>
      <td>Metro City</td>
      <td>Super tower</td>
    </tr>
    <tr>
      <th>1</th>
      <td>Madame Uppercut</td>
      <td>39</td>
      <td>Jane Wilson</td>
      <td>[Million tonne punch, Damage resistance, Super...</td>
      <td>Super hero squad</td>
      <td>Metro City</td>
      <td>Super tower</td>
    </tr>
    <tr>
      <th>2</th>
      <td>Eternal Flame</td>
      <td>1000000</td>
      <td>Unknown</td>
      <td>[Immortality, Heat Immunity, Inferno, Teleport...</td>
      <td>Super hero squad</td>
      <td>Metro City</td>
      <td>Super tower</td>
    </tr>
  </tbody>
</table>
</div>



A coluna que corresponde a chave `powers`, que mantém informações sobre os poderes dos super-heróis, mantém listas com nomes dos poderes de cada super-herói.

Poderíamos desdobrar os valores dessa coluna utilizando o método `explode`, conforme pode-se ver a seguir.


```python
df.explode('powers')
```




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
      <th>name</th>
      <th>age</th>
      <th>secretIdentity</th>
      <th>powers</th>
      <th>squadName</th>
      <th>homeTown</th>
      <th>secretBase</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>0</th>
      <td>Molecule Man</td>
      <td>29</td>
      <td>Dan Jukes</td>
      <td>Radiation resistance</td>
      <td>Super hero squad</td>
      <td>Metro City</td>
      <td>Super tower</td>
    </tr>
    <tr>
      <th>0</th>
      <td>Molecule Man</td>
      <td>29</td>
      <td>Dan Jukes</td>
      <td>Turning tiny</td>
      <td>Super hero squad</td>
      <td>Metro City</td>
      <td>Super tower</td>
    </tr>
    <tr>
      <th>0</th>
      <td>Molecule Man</td>
      <td>29</td>
      <td>Dan Jukes</td>
      <td>Radiation blast</td>
      <td>Super hero squad</td>
      <td>Metro City</td>
      <td>Super tower</td>
    </tr>
    <tr>
      <th>1</th>
      <td>Madame Uppercut</td>
      <td>39</td>
      <td>Jane Wilson</td>
      <td>Million tonne punch</td>
      <td>Super hero squad</td>
      <td>Metro City</td>
      <td>Super tower</td>
    </tr>
    <tr>
      <th>1</th>
      <td>Madame Uppercut</td>
      <td>39</td>
      <td>Jane Wilson</td>
      <td>Damage resistance</td>
      <td>Super hero squad</td>
      <td>Metro City</td>
      <td>Super tower</td>
    </tr>
    <tr>
      <th>1</th>
      <td>Madame Uppercut</td>
      <td>39</td>
      <td>Jane Wilson</td>
      <td>Superhuman reflexes</td>
      <td>Super hero squad</td>
      <td>Metro City</td>
      <td>Super tower</td>
    </tr>
    <tr>
      <th>2</th>
      <td>Eternal Flame</td>
      <td>1000000</td>
      <td>Unknown</td>
      <td>Immortality</td>
      <td>Super hero squad</td>
      <td>Metro City</td>
      <td>Super tower</td>
    </tr>
    <tr>
      <th>2</th>
      <td>Eternal Flame</td>
      <td>1000000</td>
      <td>Unknown</td>
      <td>Heat Immunity</td>
      <td>Super hero squad</td>
      <td>Metro City</td>
      <td>Super tower</td>
    </tr>
    <tr>
      <th>2</th>
      <td>Eternal Flame</td>
      <td>1000000</td>
      <td>Unknown</td>
      <td>Inferno</td>
      <td>Super hero squad</td>
      <td>Metro City</td>
      <td>Super tower</td>
    </tr>
    <tr>
      <th>2</th>
      <td>Eternal Flame</td>
      <td>1000000</td>
      <td>Unknown</td>
      <td>Teleportation</td>
      <td>Super hero squad</td>
      <td>Metro City</td>
      <td>Super tower</td>
    </tr>
    <tr>
      <th>2</th>
      <td>Eternal Flame</td>
      <td>1000000</td>
      <td>Unknown</td>
      <td>Interdimensional travel</td>
      <td>Super hero squad</td>
      <td>Metro City</td>
      <td>Super tower</td>
    </tr>
  </tbody>
</table>
</div>



## Conclusão

JSON permite estruturar dados nos mais diferentes formatos. Atributos podem manter listas de valores, ou até mesmo lista de dicionários. As possibilidades são numerosas.

Nesse artigo, comentamos sobre o uso de algumas funções e métodos para transformados dados no formato JSON em dataframes, sendo elas:


1.   [`json.loads`](https://docs.python.org/3/library/json.html)
2.   [`pd.read_json`](https://pandas.pydata.org/pandas-docs/stable/reference/api/pandas.read_json.html)
3.   [`dataframe.explode`](https://pandas.pydata.org/pandas-docs/stable/reference/api/pandas.DataFrame.explode.html)
4.   [`pd.json_normalize`](https://pandas.pydata.org/pandas-docs/stable/reference/api/pandas.json_normalize.html)


