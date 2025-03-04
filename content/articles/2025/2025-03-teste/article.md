title: Um guia rápido para arquivos de configuração INI com `configparser`
summary: Conheça as principais funções da biblioteca `configparser` para manipular arquivos `.ini` no Python.
date: 2025-02-28
slug: guia-configparser-python
authors: Giliard Godoi
category: programming-skills
tags: python, configparser, ini, configuração


![Mapa mental do configparser]({static}/images/2024/mind-map-configparser.png)

Os arquivos `.ini` são um formato simples e amplamente utilizado para armazenar configurações de aplicativos. No Python, a biblioteca padrão [`configparser`](https://docs.python.org/3/library/configparser.html) facilita a leitura e escrita desses arquivos.

## 📌 O que são arquivos `.ini`?
- Estrutura de **chave-valor** organizada em **seções**.
- Permitem **comentários** usando `#`.
- Todos os valores são armazenados como **strings**, mas podem ser convertidos.
- O formato é semelhante a um **dicionário Python**.

Exemplo de um arquivo `.ini`:
```ini
[DEFAULT]
name = Giliard Godoi
email = ggodoi@email.com
local = Brasil
secret_agent = True

[education]
school = Federal University of Technology - Paraná
major  = Software Development
year   = 2018

[skills]
programming = Python, JavaScript, C, C++
languages   = Portuguese, English
```

## 🚀 Configparser na prática
### 🔹 Criando e carregando um arquivo `.ini`
```python
import configparser
config = configparser.ConfigParser()
config.read('config.ini')
```

### 🔹 Listando seções
```python
print(config.sections())  # ['education', 'skills']
```

### 🔹 Acessando valores
```python
print(config['education']['school'])  # 'Federal University of Technology - Paraná'
print(config.get('education', 'year'))  # '2018'
```

### 🔹 Convertendo tipos
```python
print(config.getint('education', 'year'))  # 2018 (int)
print(config.getboolean('DEFAULT', 'secret_agent'))  # True (bool)
```

### 🔹 Verificando a existência de seções e opções
```python
print('skills' in config)  # True
print(config.has_option('education', 'major'))  # True
```

### 🔹 Obtendo todas as opções de uma seção
```python
print(config.options('education'))  # ['school', 'major', 'year']
```

### 🔹 Iterando sobre os itens de uma seção
```python
for key, value in config.items('education'):
    print(f'{key}: {value}')
```

## 📝 Salvando alterações em um arquivo
### 🔹 Adicionando uma nova seção e salvando
```python
config['project'] = {'name': 'ConfigParser Guide', 'version': '1.0'}
with open('config.ini', 'w') as configfile:
    config.write(configfile)
```

### 🔹 Lendo novamente para verificar as mudanças
```python
config.read('config.ini')
print(config.sections())  # ['education', 'skills', 'project']
```

## ⚠️ Dicas e boas práticas
- Sempre use `getint()`, `getfloat()`, ou `getboolean()` quando precisar de tipos específicos.
- Utilize `fallback=` no método `get()` para evitar erros ao acessar chaves inexistentes.
- Se precisar armazenar listas, use separadores consistentes e o método `.split()` para recuperação.

## 📚 Referências
1. [Documentação oficial do configparser](https://docs.python.org/3/library/configparser.html)
2. [INI file - Wikipedia](https://en.wikipedia.org/wiki/INI_file)

Agora você tem um guia rápido para manipular arquivos `.ini` com `configparser`! 🚀 Tem dúvidas ou sugestões? Deixe um comentário! 👇
