title: Diferentes formas de baixar dados da internet com bibliotecas do Python
date: 2023-04-13
slug: download-datasets
authors: Giliard Godoi
summary: Vamos explorar como baixar *datasets* da internet com algumas bibliotecas do Python como urllib, requests e até o pandas.
category: programming-skills
tags: python, urllib, requests, pandas, json


(Re)Lendo o livro [*Hands-On Machine Learning with Scikit-Learn, Keras & TensorFlow*](https://www.amazon.com.br/Hands-Machine-Learning-Scikit-Learn-TensorFlow/dp/1492032646) o autor mostra diversas maneiras de baixar *datasets* da *internet*. Nesse artigo, vou resumir algumas maneiras utilizando as bibliotecas padrão do Python para fazer *download* de arquivos compactados, arquivos no formato *csv* e *json*.


## Repositórios dados

Existem muitos sites que reunem e disponibilizam *datasets* de forma pública. Alguns desses repositório, inclusive, disponibilizam dados com a finalidade de incentivar o aprendizado e a prática de *machine learning*.

Alguns desses repositórios são:

1. [UCI Machine Learning Repository](https://archive.ics.uci.edu/ml/index.php): que agora possui uma versão beta mais apresentável <https://archive-beta.ics.uci.edu/>
2. [Google Dataset Search](https://datasetsearch.research.google.com/): buscador especializado do Google para pesquisa de *datasets*, semelhante ao [Google Acadêmico](https://scholar.google.com/).
3. [Kaggle Datasets](https://www.kaggle.com/datasets): possui a promessa de *Find Open Datasets and Machine Learning Projects*.
4. Portal de Dados Abertos do Governo Federal <https://dados.gov.br/home>



## Baixando arquivos compactados com `urllib`

O primeiro exemplo é baixar um arquivo com compactado, na extensão .tar (e família) utilizando a biblioteca `urllib`.
```python
import urllib
import tarfile

# dataset aleatório
source_url = "https://figshare.com/ndownloader/files/28272789"
dest_file = "dataset.tar.xz"
data_folder = "my-folder"

downloaded_file, _ = urllib.request.urlretrieve(source_url, dest_file)
tar_bz2_file = tarfile.open(downloaded_file)
tar_bz2_file.extractall(path=data_folder)
tar_bz2_file.close()
```
Os passos são os seguintes:

1. baixar os dados com o método `urllib.request.urlretrieve`;
2. criar um objeto `tarfile.TarFile` com o método `tarfile.open`;
3. extrair o arquivo compacta com `.extractall` passando o diretório destino;
4. fechar o arquivo com `.close`.

O segundo exemplo é utilizando a biblioteca `zipfile` para extrair dados de arquivos compactados com a extensão `.zip`

Nesse exemplo, vamos incrementar e utilizar a biblioteca `pathlib` para representar os diretórios e arquivos.
```python
import zipfile
import urllib
import pathlib

url = "https://armazenamento-dadosabertos.s3.sa-east-1.amazonaws.com/Plano+2016_2018_Grupos+de+dados/INSS+-+Benef%C3%ADcios+Concedidos/beneficios-concedidos-06-2021.zip"

dest = pathlib.Path('destination')
dest.mkdir(parents=True, exist_ok=True)
file = 'dataset.zip'

urllib.request.urlretrieve(url, file)

zipfile.ZipFile(file, 'r').extractall(dest)
```
De forma semelhante, utilizamos os seguinte passo:

1. Criamos a pasta destino e o arquivo;
2. Baixamos o arquivo com `urllib.requests.urlretrieve`;
3. criamos um objeto do tipo `zipfile.ZipFile` indicando o modo leitura `r` ;
4. E logo em seguida já estraímos os dados para a pasta destino.

Também podemos utilizar `urllib.requests.urlretrieve` para baixar arquivos em outros formatos como `.txt` ou `.csv`.

Porém, vamos olhar outras possibilidades, como a biblioteca `requests`.

## Baixando arquivos com `requests`

O uso é similar com a biblioteca `requests`.
```python
import requests

url = 'https://archive.ics.uci.edu/ml/machine-learning-databases/wine-quality/winequality-white.csv'

dest = 'sample.csv'
response = requests.get(url)

with open(dest, 'w') as file:
    content = response.content.decode('utf-8')
    file.write(content)
```
1. Primeiro, fazemos uma requisição pelo arquivo, obtendo um objeto do tipo `requests.models.Response` e salvando na variável `response`;
2. Para salvar o arquivo solicitado em um arquivo local, recuperamos o conteúdo da resposta, salvo no parametro `.content`;
3. Aqui tomamos um cuidado ao garantir que estamos utilizando o conjunto de caractéres corretos para ler esse arquivo, que é o `utf-8`;
4. E salvamos esse arquivo localmente.

## Utilizando `pandas`

Uma outra opção interessante é passar a `url` direto como argumento da função `pd.read_csv` da biblioteca pandas.

Assim para a url acima já poderíamos ter feito:
```python
import pandas as pd

url = 'https://archive.ics.uci.edu/ml/machine-learning-databases/wine-quality/winequality-white.csv'

df = pd.read_csv(url, delimiter=';')

df.head()
```
Existe a possibilidade de salvar esses dados localmente com o método `df.to_csv` presente no objeto DataFrame.

## Baixando arquivos JSON

A última dica é sobre baixar arquivos no formato JSON. Em um primeiro momento, poderíamos utilizar a biblioteca `json` para transformar a *string* retornada na resposta para um dicionário do Python, como no exemplo abaixo:

```python
import json

response = requests.get(url)
data = json.loads(response.content)
print(len(data))
```

Porém, o próprio objeto de resposta possui um método `.json` que faz essa transformação.

```python
import requests

url = "https://servicodados.ibge.gov.br/api/v1/localidades/municipios"

response = requests.get(url)
data = response.json()
```

Pode não ser perfeito, mas deve resolver um punhado de situação.

## Desabafo

A onda do chatGPT me desanimou para criara conteúdos desse tipo: sem querer encher linguiça, direto ao ponto; sem *enrolation* para ser um caça níquel de publicidade.

Mas quer saber, eu vou fazer porque acho divertido! E é sobre isso!

