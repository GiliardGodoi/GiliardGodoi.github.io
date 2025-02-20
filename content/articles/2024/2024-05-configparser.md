title: Como manipular arquivos de configuração config.ini
summary: Conheçendo um pouco sobre a biblioteca `configparser`
date: 2024-05-26
slug: conhecendo-arquivos-configuracao-configini
authors: Giliard Godoi
category: utils
tags: config, toml, yaml

---

Este artigo faz parte de uma série de três publicações que tratam de arquivos de configurações comuns em projetos desenvolvidos em Python.
Esses formatos são `config.ini`, `yaml`, e `toml`.

Serão apresentados as características básicas desses formatos, e quais bibliotecas podem ser utilizadas para manipular os arquivos de cada uma dessas extensões.

O artigo está organizado sob o formatos de perguntas e respostas, com o correspondente exemplo de um código, para facilitar consultas futuras.

# Config initialization (config.ini)

Os arquivos `.ini` foram primeiramente projetados para o [sistema Microsoft Windows](https://en.wikipedia.org/wiki/INI_file).
Contudo, eles foram adotados por outros softwares (inclusives de código aberto) onde podem aparecer sob a extensão `.cfg` com implementações ligeiramente diferente.


Basicamente, as informações são guardadas sob o esquema chave-valor e podem ser organizadas em diversas seções.
O arquivo no entando deve possuir uma sessão `DEFAULT`.

A manipulação desses arquivos podem ser feitas pela biblioteca padrão [`configparser`](https://docs.python.org/3/library/configparser.html).

As principais características desse formato são:

1. Ser facilmente lido (e entendido) por um humano
2. Podem ser utilizados como delimitadores de valor os caracteres '`=`' ou '`:`'.
3. Comentários são precedidos pelo caracter '`#`'
4. Todos os valores são convertidos para `string`, porém existem alguns métodos especiais para converter os valores para determinado tipo;
5. Ao realizar o parse de um arquivo, a estrutura de dados retornados se assemelha a um dicionário do Python.

## O básico sobre `configparser`

Um exemplo da organização desse arquivo pode ser vista em `configuration_string`, conforme definido abaixo:

```python
import configparser

config = configparser.ConfigParser()

configuration_string = '''
[DEFAULT]
name  = Giliard Godoi
email = ggodoi@email.com
local = Brasil
secret_agent = True

# This is a comment

[education]
school = Federal University of Technology - Paraná
major  = Software Development
year   = 2018

# This is a list of skills
[skills]
programing :
    Python
    JavaScript
    C
    C++

language :
    Portuguese
    English
'''
```


### Como realizar o parse da string?

```python
config.read_string(configuration_string)

type(
    config
)
```
<div style="max-width:800px; border: 1px solid var(--colab-border-color);"><style>
      pre.function-repr-contents {
        overflow-x: auto;
        padding: 8px 12px;
        max-height: 500px;
      }

      pre.function-repr-contents.function-repr-contents-collapsed {
        cursor: pointer;
        max-height: 100px;
      }
    </style>
    <pre style="white-space: initial; background:
         var(--colab-secondary-surface-color); padding: 8px 12px;
         border-bottom: 1px solid var(--colab-border-color);"><b>configparser.ConfigParser</b><br/>def __init__(defaults=None, dict_type=_default_dict, allow_no_value=False, *, delimiters=(&#x27;=&#x27;, &#x27;:&#x27;), comment_prefixes=(&#x27;#&#x27;, &#x27;;&#x27;), inline_comment_prefixes=None, strict=True, empty_lines_in_values=True, default_section=DEFAULTSECT, interpolation=_UNSET, converters=_UNSET)</pre><pre class="function-repr-contents function-repr-contents-collapsed" style=""><a class="filepath" style="display:none" href="#">/usr/lib/python3.10/configparser.py</a>ConfigParser implementing interpolation.</pre>
      <script>
      if (google.colab.kernel.accessAllowed && google.colab.files && google.colab.files.view) {
        for (const element of document.querySelectorAll('.filepath')) {
          element.style.display = 'block'
          element.onclick = (event) => {
            event.preventDefault();
            event.stopPropagation();
            google.colab.files.view(element.textContent, 1197);
          };
        }
      }
      for (const element of document.querySelectorAll('.function-repr-contents')) {
        element.onclick = (event) => {
          event.preventDefault();
          event.stopPropagation();
          element.classList.toggle('function-repr-contents-collapsed');
        };
      }
      </script>
      </div>


### O que é uma seção?

```python
config['DEFAULT']
```

    <Section: DEFAULT>

### Como saber quais são as demais seções?

```python
config.sections()
```

    ['education', 'skills']

### Como verificar se uma seção existe dentro de um objeto `config`?

```python
('education' in config) or config.has_section('education')
```

    True

### Como verificar se existe uma opção (chave) dentro de uma seção?

```python
config.has_option(section='education', option='year')
```

    True

### Como verificar se existe uma opção para a seção default?
```python
'''
Se especificado `section` igual a None ou string vazia, a seção default é verificada.
'''
config.has_option(section=None, option='company')
```

    False

```python
config.has_option(section=None, option='email')
```

    True

### Como acessar um valor na seção default?

```python
config['DEFAULT']['name']
```

    'Giliard Godoi'

### Como acessar um valor em uma outra seção?

```python
config['education']['school']
```

    'Federal University of Technology - Paraná'

Ou então, utilizar o método get
```python
config.get(section='education', option='school')
```

    'Federal University of Technology - Paraná'

### Qual é o tipo de dado retornado por padrão?

```python
type(
    config['education']['year']
)
```

    str

### Isso serve também para listas?

```python
config['skills']['programing']
```

    '\nPython\nJavaScript\nC\nC++'

### Como converter os valores para listas?

```python
config['skills']['programing'].split()
```

    ['Python', 'JavaScript', 'C', 'C++']


No entanto, a conversão (parse) para listas não é nativamente implementada para a linguagem Python.


### Como converter o valor de uma variável para um tipo específico?

```python
print(f'''
-----------------------------------
{config.get(section='education', option='school')} : {type(config.get(section='education', option='school'))}
{config.getint('education', 'year')} : {type(config.getint('education', 'year'))}
{config.getboolean('DEFAULT', 'secret_agent')} : {type(config.getboolean('DEFAULT', 'secret_agent'))}
-----------------------------------
''')
```

    -----------------------------------
    Federal University of Technology - Paraná : <class 'str'>
    2018 : <class 'int'>
    True : <class 'bool'>
    -----------------------------------

Ou seja, existem três métodos para converter para tipos específicos:

1. `getint`
2. `getfloat`
3. `getboolean`

```python
type(
    config.getint('education', 'year')
)
```
    int

```python
type(
    config.getboolean('DEFAULT', 'secret_agent')
)
```
    bool


### É possível definir um valor fallback nos métodos get?

```python
assert not config.has_option(section='company', option='name')

config.get(section='company', option='name', fallback='Does not exist')
```
    'Does not exist'


### Como saber todas as variáveis existentes de uma seção?

```python
config.options('education')
```
    ['school', 'major', 'year', 'name', 'email', 'local', 'secret_agent']


### Como obter os itens (chave-valor) para uma seção?

```python
config.items('education')
```

    [('name', 'Giliard Godoi'),
     ('email', 'ggodoi@email.com'),
     ('local', 'Brasil'),
     ('secret_agent', 'True'),
     ('school', 'Federal University of Technology - Paraná'),
     ('major', 'Software Development'),
     ('year', '2018')]

### Como obter os itens (chave-valor) para a seção default?

```python
config.defaults()
```
    {
        'name': 'Giliard Godoi',
        'email': 'ggodoi@email.com',
        'local': 'Brasil',
        'secret_agent': 'True'
    }


# Arquivos

As operações de leitura e escrita do arquivo são bem simples, como pode ser visto a seguir.

### Como salvar as configurações em um arquivo?

```python
with open('config.ini', 'w') as f:
    config.write(f)
```


### Como ler o arquivo config.ini?

```python
other = configparser.ConfigParser()
other.sections()
```
    []


```python
other.read('config.ini')
```
    ['config.ini']


```python
other.sections()
```
    ['education', 'skills']


# Referências

1. <https://docs.python.org/3/library/configparser.html>
2. <https://en.wikipedia.org/wiki/INI_file>
