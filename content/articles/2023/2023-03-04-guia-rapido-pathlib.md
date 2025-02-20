title: Um guia rápido para o pacote pathlib
summary: Guia rápido para a biblioteca `pathlib`
date: 2023-03-04
modified: 2023-03-04
slug: guia-pathlib
authors: Giliard Godoi
category: utils
tags: python, pathlib


As vezes eu tenho uma dúvida muito simples sobre o funcionamento de uma função ou método do Python. 
Então eu crio esses guias rápidos, no estilo "Perguntas e Respostas" para me ajudar a evitar uma pesquisa no Google.

Nesse guia eu trato sobre o pacote para manipulação de diretórios e arquivos `pathlib`.

## Perguntas e Respostas

### Como importar?

```python
from pathlib import Path
```

### Como representar um caminho?

```python
>>> from pathlib import Path
>>> foo = Path('foo')
```

### Como saber se o diretório ou arquivo existe?

```python
>>> foo = Path('script.py')
>>> foo.exists()
False
```
Retorna `True` ou `False`.

### Como saber se é um arquivo ou um diretório?

```python
>>> foo = Path('foo')
>>> foo.is_dir()
True
>>> bar = Path('script.py')
>>> bar.is_file()
True
>>> bar.is_dir()
False
```

Importante notar, entretanto, que se o arquivo ou o diretório realmente não existe no sistema operacional, os métodos `is_file` e `is_dir` sempre retornarão `False`.

### Como saber o nome de um arquivo\\diretório ? 

```python
>>> foo = Path('bar\script.py')

>>> foo.name
>>> 'script.py'
```

### Como criar um arquivo?

Como criar um arquivo no sistema de arquivo.
```python
>>> foo = Path('script.py')

>>> foo.touch()
```

Esse método também pode ser usado para alterar o timestamp de um arquivo que já existia previamente.

### Como remover um arquivo?

```python
>>> bar = Path('main.py')

>>> bar.unlink()
```

### Como renomear um arquivo?

```python
>>> foo = Path('script.py')

>>> bar = foo.rename('main.py')
```

Ou então:
```python
>>> bar = foo.rename(Path('main.py'))
```
Lembre-se que estamos trabalhando com objetos imutáveis. 
Então, a operação de `rename` retorna um novo objeto.
Essa operação é refletida no sistema de arquivos do seu computador. 
Diferente da próxima opção, mostrada a seguir.

Também podemos nos referir a um mesmo arquivo com um nome diferente, mas que não necessáriamente existe no FS do computador.
Poderíamos renomea-lo de forma virtual somente.

```python
>>> foo = Path('script.py')

>>> bar = foo.with_name('main.py') 
>>> bar.exists()
False
>>> foo.exists()
True

>>> bar.touch()
>>> bar.exists()
True
```

Isso simplifica como fazer cópias de um mesmo arquivo, talvez?

### Como saber a extensão de um arquivo?

Com o atributo `.suffix`
```python
>>> foo = Path('script.py')

>>> foo.suffix
'.py'
```

Ou com o atributo `suffixes` que retorna uma lista nos casos de:
```python
>>> foo = Path('library.tar.gar')

>>> foo.suffixes
['.tar', '.gar']
```

### Como ler e escrever texto em um arquivo?

Existem vários modos de se fazer isso.

A maneira mais direta é utilizando os métodos `write_text` e `read_text`
```python
>>> foo = Path('README.md')
>>> foo.write_text('Some text here!')
15
>>> foo.exists() 
True
>> foo.read_text()
"Some text here!"
```

Também podemos fazer algo parecido com os métodos `write_bytes` e `read_bytes` para arquivos binários.

### Como criar um diretório novo?
```python
foo = Path('foo')

foo.mkdir()
```

### Como listar os arquivos ou subdiretórios a partir do diretório atual?

Podemos iterar com ajuda do método `iterdir()`
```python

foo = Path('tutorial')

directories = [f for f in foo.iterdir() if f.is_dir()]
```

Ou com a ajuda do método `glob` que aceita uma string com o padrão de nomes que queremos percorrer.

```python 
foo = Path('tutorial')

# lista todos os arquivos e subdiretórios do diretório atual
foo.glob("*")

# retorna todos os arquivos com a extensão .ipynb do diretório atual
foo.glob("*.ipynb")

# retorna todos os arquivos e subdiretórios a partir do diretório atual
foo.glob("**/*")
```

O método `rglob` server como um atalho para `glob` com a string `**/` já adicionada à direita do padrão passado como parâmetro. 
```python
>>> foo.rglob('*.ipynb')

# possui o mesmo efeito que 

>>> foo.glob("**/*.ipynb")
```

Lembre-se que os métodos `iterdir`, `glob` e `rglob` retornam um iterador e não a lista propriamente dita.

### Como remover um diretório?

Se o diretório está vazio, basta o comando:
```python
>>> foo = Path('foo')

>>> foo.rmdir()
```

Caso o diretório não esteja vazio, tem-se duas opções:

A primeira é remover todos os arquivos e subdiretórios a partir do diretório atual, utilizando recursão e um a um.

Ou então podemos utilizar a função `shutil.rmtree` do módulo `shutil`.

### Como concatenar o nome de um diretório como um nome de um subdiretório ou um arquivo?

Podemos utilizar o operador `/` como no exemplo a seguir:
```python
>>> foo = Path('foo')
>>> foo / 'bar' / 'test' / 'test_script.py'
>>> foo
WindowsPath('foo/bar/test/test_script.py')
```

Com o método `joinpath`
```python
>>> foo = Path('foo')
>>> foo.joinpath('bar', 'test', 'test_script.py')
WindowsPath('foo/bar/test/test_script.py')
```

Ou então, diretamente na inicialiação do objeto:
```python
>>> foo = Path('foo', 'bar', 'test', 'test_script.py')
```

Por incrível que parece o operador de adição `+` não retorna a concatenação de vários caminhos.

### Como saber o diretório pai de um arquivo ou diretório?

Podemos tentar algo como:
```python
>>> foo = Path('foo')
>>> foo.parent # retorna o primeiro diretório pai
>>> # ou então
>>> foo.parents # retorna um gerador para os diretórios pais
```
Mas isso pode retorna uma resposta como `WindowsPath('.')` caso o arquivo não exista ou foi criado depois que a variável foi inicializada.

Porém, podemos recuperar o diretório pai de diretório atual de onde esse arquivo foi criado:
```python
>>> foo = Path('foo')
>>> foo.resolve().parent # retorna o primeiro diretório pai
WindowsPath('folder')
>>>
>>> foo.resolve().parents # retorna um gerador
<WindowsPath.parents>
```

Também podemos recuperar essas informações com o atributo `parts`:
```python
>>> foo = Path('folder/script.py')
>>> foo.resolve().parts
('folder', 'script.py')
```

### Como saber o diretório de trabalho atual?
```python
>>> from pathlib import Path
>>> Path.cwd()
'/home/user/folder_x'
```

Também conhecido como *current working diretory* ou `cwd`.

## Exemplos

Os dois exemplos a seguir foram visto nesse post do [*blog Real Python*](https://realpython.com/python-pathlib/#examples) . 
1. Contar os arquivos em um diretório atual, agrupado pela extensão do arquivo;
2. Mostrar a estrutura de diretórios.

### Contar arquivos
O primeiro *snippet* de código mostra como contar os arquivos conforme as suas extensões:
```python
>>> from collections import Counter
>>> Counter(p.suffix for p in Path.cwd().iterdir() if p.is_file())
Counter({'.html': 7, '.png': 6, '.xml': 1, '.ico': 1, '.md': 1, '.webmanifest': 1})
```


### Mostrar a estrutura de diretórios

O segundo mostra um forma de criar uma visualização no terminal para a estrutura de diretórios.
```python
def tree(directory):
    print(f'+ {directory}')
    for path in sorted(directory.rglob('*')):
        depth = len(path.relative_to(directory).parts)
        spacer = '    ' * depth
        print(f'{spacer}+ {path.name}')

tree(Path.cwd())
```

## Para saber mais

Para saber mais sobre o módulo `pathlib`, além da página da documentação, eu recomendo essa live do Dunossauro do Canal Live de Python sobre [Manipulação de arquivos e pastas com pathlib - Live de Python #199 - YouTube](https://www.youtube.com/watch?v=E_hox7iZjOE).

## Referências

1. Python Documentation. **pathlib — Object-oriented filesystem paths**. Disponível em: <https://docs.python.org/3/library/pathlib.html> Acessado em: 14 de fev. de 2023.
2. Eduardo Mendes: Live de Python. **Manipulação de arquivos e pastas com pathlib - Live de Python #199** . Disponível em: <https://www.youtube.com/watch?v=E_hox7iZjOE> Acessado em 14 de fev. de 2023.
3. Real Python. **Python 3's pathlib Module: Taming the File System** . Disponível em <https://realpython.com/python-pathlib/> Acessado em 14 de fev. de 2023.
