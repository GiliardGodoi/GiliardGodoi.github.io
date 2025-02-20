Title: Como criar um blog com Pelican?
Date: 2022-12-26
Modified: 2023-01-09
Slug: meu-blog-com-pelican
Authors: Giliard Godoi
Summary: Da definição do ambiente até a instalação de temas.
Category: utils
Tags: pelican

# O que é Pelican?

[Pelican](https://getpelican.com/) é um gerador de site estático escrito em Python. 
Essa ferramenta tem por objetivo criar e gerenciar um pequeno *blog* como é esse que você está lendo.
Ou seja, não é uma ferramenta para criar documentação de projetos de *software*, como tantas outras ferramentas existentes por aí.

Os artigos podem ser escritos em arquivos na extensão *Markdown* ou *reStructuredText*.
A própria ferramenta converte esses arquivos para páginas web (html) com os estilos e formatações definidas pelo tema escolhido.
Também é possível utilizar outras extensões de arquivos (como .ipynb) com o uso de plugins.

Neste artigo, reconstruírei o passo-a-passo que eu utilizei para construir o meu *blog*.

Entretanto, antes de instalar o Pelican, talvez você queira saber dos [problemas existentes com esse framework](#a-falta-de-atualização-do-pelican).


# Instalação básica

A instalação básica é descrita na própria documentação do Pelican, que pode ser acessada no seguinte link:

+ [docs.getpelican.com/en/latest/install.html](https://docs.getpelican.com/en/latest/install.html).

É recomendado definir uma ambiente de desenvolvimento próprio e, como eu uso o [`conda`](https://docs.conda.io/projects/conda/en/stable/), eu fiz isso utilizando os seguintes comandos:

```bash
conda create --name blog-demo python==3.9
```

E depois:

```bash
conda activate blog-demo
```
Como eu prefiro escrever utilizando *markdown*, eu já fiz a instalação incluíndo a opção para esse formato de arquivo.

```bash
python -m pip install "pelican[markdown]"
```
Também já fiz a instalação de pacotes adicionais como é o caso do typogrify, conforme recomendado -- ainda que eu não entendi muito bem, quando e onde essa biblioteca é utilizada.

```bash
python -m pip install typogrify
```

# Primeiro projeto

Pelican possui uma ferramenta de linha de comando que facilita a criação dos nossos projetos.
Para isso basta digitar:

```bash
pelican-quickstart
```

Esse utilitário faz uma série de perguntas para definição do seu projeto. 
Por exemplo, ele pergunta sobre qual diretório onde você deseja criar o seu projeto; 
o título do site; 
o nome do autor principal; 
a URL principal; 
se você deseja habilitar a paginação dos artigos;
onde e como deseja hospedar o seu site na internet; entre outras perguntas.

A estrutura básica do projeto criada pelo utilitário, será:

    blog-demo/
    ├── content
    │   └── (pages)
    ├── output
    ├── tasks.py
    ├── Makefile
    ├── pelicanconf.py       # Main settings file
    └── publishconf.py       # Settings to use when ready to publish

Os scripts `pelicanconf.py` e `publishconf.py` possuem as configurações (as variáveis e valores) que o Pelican usa para construir o site. 
O primeiro *script* seria as configurações de desenvolvimento enquanto o segundo seria as de publicação. ~~Porém, para falar a verdade, não utilizo o segundo~~.

A pasta `content` abriga o conteúdo do site: os artigos, imagens, as páginas de seções fixas, e outros arquivos de configuração. 
Instruções sobre como escrever conteúdo para o site pode ser encontrada na seguinte página: [docs.getpelican.com/ ... /content.html](https://docs.getpelican.com/en/latest/content.html).

A pasta `output` contém todo o conteúdo publicável do site, isto é, arquivos html e css. É possível alterar essa pasta destino nos arquivos de configurações, alterando a variável `OUTPUT_PATH`. Para conhecer mais sobre as configurações, visite a seguinte página [docs.getpelican.com/ ... /settings.html](https://docs.getpelican.com/en/latest/settings.html).

# Quero controlar as versões do meu site?

Para controlar as versões do projeto utilizando o `Git` precisamos inicializar o repositório antes com:

```bash
git init
```

Particularmente, eu não utilizo muito esse comando. 
Eu prefiro criar o repositório no GitHub primeiro, para fazer o clone localmente depois. 
Isso permite pular toda uma configuração para sincronizar o repositório local com o remoto.

# Alterando o tema

Existe uma diversidade de temas disponíveis para customizar o seu *blog*. 
Esses temas estão reunidos pelos organizadores do projeto no seguinte repositório:

+ [github.com/getpelican/pelican-themes](https://github.com/getpelican/pelican-themes)

Nessa [postagem de David Colton](https://davidcolton.github.io/articles/2020/03/08/new_theme_for_blog/) é ensinado a como instalar o tema [`Alchemy`](https://github.com/nairobilug/pelican-alchemy) e os seus suplementos necessários.
O meu próprio *blog* utiliza esse tema.

Eu queria instalar um tema legal como o [`Papyrus`](https://aleylara.github.io/Papyrus/installation.html). 
Porém, a dificuldade de instalar o [`stork-search](https://stork-search.net/) no meu SO me impediu de usar esse tema. ~~Pois, sem tempo irmão~~.

Portanto, eu decidi utilizar para esse tutorial o tema [`voce`](https://github.com/limbenjamin/voce).

Primeiro precisamos adicionar uma pasta à estrutura do projeto para manter o tema do nosso site. Então na pasta raiz do projeto executamos o seguinte código:

```bash
mkdir themes
cd themes
```
Note que essa pasta ficará no mesmo nível que as pastas `content` e `output`.

Depois instalamos o tema como um submódulo no diretório de temas.

```bash
git submodule add --depth 5 https://github.com/limbenjamin/voce themes/voce
```

Agora indicamos nos arquivos de configuração (`pelicanconf.py`) o caminho do tema que desejamos utilizar, e definimos outras variáveis requisitadas pelo tema. 
Em caso de dúvida, leia as instruções de instalação do tema de sua escolha.

```python
THEME = 'themes/voce'
DEFAULT_DATE_FORMAT = "%b %d, %Y"
USER_LOGO_URL = "http://i.imgur.com/zzCRZUH.jpg"  
```

No caso do tema `voce`, para habilitar a nuvem de *tags* logo abaixo da imagem título do site é preciso adicionar as seguintes variáveis ao arquivo de configuração:

```python
TAGS_URL = 'tags.html'
ARCHIVES_URL = 'archives.html'
```

# Escrevendo uma publicação

Para escrever postagens é bem simples, como pode ser visto nessa [página da documentação](https://docs.getpelican.com/en/latest/content.html#writing-content) da ferramenta. 

No meu caso, eu prefiro escrever os conteúdos em Markdown. Portanto, as instruções a seguir serão feitas considerando esse formato de arquivo. 

Primeiro, definimos o cabeçalho do arquivo com alguns parâmetros obrigatórios (como título, data e autor) e outros campos opcionais. 

```markdown
Title: Post's title
Date: 2022-12-26 10:20
Modified: 2022-12-27 19:30
Category: Python
Tags: Pelican, blogging
Slug: my-custom-optional-post-url
Authors: Giliar Godoi
Summary: Short version for index and feeds

Here starts the content of my blog post.
...
```

Logo abaixo desse cabeçalho já podemos escrever o texto de nossa postagem. 
O título da postagem, definido pelo parâmetro `Title`, irá aparecer antes texto da postagem. 
Então não é necessário incluí-lo novamente após o cabeçalho de parâmetros.

# Escrevendo páginas para seções fixas

Mesmo para um *blog* é interessante possuir páginas estáticas com seções que não se alteram constantemente.
É o caso de páginas que diz um pouco sobre o autor ou formas de entrar em contato.

Para tanto, é possível criar uma pasta `pages` dentro de `content` e o Pelican já irá entender que todo o conteúdo dentro dessa pasta se refere a seções com conteúdo fixo.

Por exemplo, no meu caso, a pasta `pages` está organizada da seguinte forma:

    blog-demo/
    ├── content
    │   └── articles
    │   └── pages
    │       └── 01aboutme.md
    │       └── 02projects.md
    │       └── 03contact.md
    │       └── 404.md
    └── ...

Na maioria dos temas essas páginas já aparecem por padrão na página inicial.
Tal comportamento pode ser visto no meu *blog* que utiliza o tema `Alchemy`.
Porém, esse não é o caso do tema `voce`.

Contudo, conseguimos o mesmo comportamento se alterarmos a variável `LINKS` no arquivo de configuração.

```python
LINKS = (('About Me', f'{SITEURL}/pages/about/'),
         ('Projects', f'{SITEURL}/pages/projects'),
         ('Contact', f'{SITEURL}/pages/contact/'),
        )
```

Note que as URLs das páginas possuem uma formatação especial adicionada por uma configuração extra que pode ser vista na próxima seção.

# Customizando as URLs

É possível alterar o local e alterar as configurações das URLs finais dos *posts*. 
Por exemplo, com as configurações básicas definidas anteriormente, as URLs dos artigos ficariam com o seguinte padrão:

```
blog-demo.com/my-first-article-with-papyrus.html
```

Por padrão, o Pelican utiliza o título do artigo, definido no parâmetro `Title`, como base para criar a URL da postagem.
É possível alterar esse comportamento adicionando o parâmetro `Slug` no cabeçalho das postagens.

Também é possível agrupar todos os artigos sob a URL `articles` e agrupar as postagens por ano. 
Para tanto, basta alterar as variáveis `ARTICLE_URL` e `ARTICLE_SAVE_AS` nos arquivos de configuração.

```python
ARTICLE_URL = "articles/{date:%Y}/{slug}/"
ARTICLE_SAVE_AS = "articles/{date:%Y}/{slug}/index.html"
```

O mesmo comportamento também pode ser obtido para as páginas de categoria, tags e as páginas fixas definidas pelo usuário.

```python
PAGE_URL = "pages/{slug}/"
PAGE_SAVE_AS = "pages/{slug}/index.html"
CATEGORY_URL = "category/{slug}"
CATEGORY_SAVE_AS = "category/{slug}/index.html"
TAG_URL = "tag/{slug}"
TAG_SAVE_AS = "tag/{slug}/index.html"
```

# Definir uma página customizada para o erro 404 (Página não encontrada)

Também é possível definir uma página customizada para o erro 404 de página não encontrada.

A princípio basta adicionar um arquivo `404.md` sob o diretório `pages` com as seguintes configurações: 

```markdown
Title: Not Found
Status: hidden
Save_as: 404.html
permalink: /404.html

The requested item could not be located. Perhaps you might want to check
the [Archives](/archives.html)?
```

Diferentemente do que diz a [documentação](https://docs.getpelican.com/en/latest/tips.html#custom-404-pages), foi necessário adicionar o parâmetro `permalink: /404.html` nessa página para que ela funcionasse de forma apropriada com o GitHub Pages.

# Definir pastas para conteúdo estático

Conteúdos estáticos são arquivos que serão disponibilizados ao visitante do *blog* de alguma forma, mas não serão processados pelo Pelican, como acontece com os arquivos em *markdown* que serão convertidos em *html*.

Arquivos estáticos são arquivos de imagens, favico (aquele ícone que aparece no guia do navegador junto com o título do site) e outros aruivos de configuração do site.
Esses arquivos ficarão em pastas separadas, por exemplo, as imagens ficarão em uma pasta `images` e os arquivos demais arquivos de configuração na pasta `extras`. 

Existe uma variável que permite definir o local dessas diferentes pastas a partir da pasta `content`.
Para o meu *blog*, eu configurei quatro pastas para servir conteúdos estáticos: 
uma pasta para imagens; 
outras para arquivos na extensão PDF; 
outras para os arquivos de configuração; 
e uma última para os arquivos de *datasets* que serão utilizados para ilustrar alguns dos meus *posts*.

```python
STATIC_PATHS = ["images", "pdfs", "extras", "datasets"]
```
Para fazer referência no nosso blog, dos arquivos contidos em uma dessas pastas, nós utilizamos a seguinte sintaxe  dentro dos nossos arquivos *markdown* que serão convertidos em *html*.

```markdown
Por exemplo, como é mostrado na imagem abaixo:

![python logo]({static}/images/python_icon.png)

Exemplo de como disponibilizar um arquivo em pdf.
[Pelican Documenation]({static}/pdfs/pelican.pdf)
```

## Configurar o ícone do site

Favicon são aqueles ícones que identificam um site nas guias do navegador ou então na barra de endereços. Você pode saber mais sobre eles nessa página da [Wikipedia](https://pt.wikipedia.org/wiki/Favicon).

Para gerar os arquivos necessários, você pode utilizar um gerador de favicon existente na internet. 
Tudo o que você precisa é uma imagem base e o gerador vai gerar todos os arquivos necessários.
No meu caso, o gerador também criou ícones adicionais para outras plataformas e de diferentes tamanhos, tudo a partir de uma única imagem base.

```python
EXTRA_PATH_METADATA = {
    "extras/android-chrome-192x192.png" : { "path" : "android-chrome-192x192.png"},
    "extras/android-chrome-512x512.png" : { "path" : "android-chrome-512x512.png"},
    "extras/browserconfig.xml" : {"path" : "browserconfig.xml"},
    "extras/apple-touch-icon.png" : { "path" : "apple-touch-icon.png"},
    "extras/favicon-16x16.png" : { "path" : "favicon-16x16.png"},
    "extras/favicon-32x32.png" : { "path" : "favicon-32x32.png"},
    "extras/favicon.ico": {"path": "favicon.ico"},
    "extras/mstile-150x150.png" : {"path" : "mstile-150x150.png"},
    "extras/safari-pinned-tab.svg" : {"path" : "safari-pinned-tab.svg"},
    "extras/site.webmanifest" : {"path" : "site.webmanifest"},
    "extras/README.md" : {"path" : "README.md"}
}
```

A variável `EXTRA_PATH_METADATA` é um dicionário onde a chave indica a localização do arquivo em relação a pasta `content`.Os valores são outros dicionários python, mas no fim das contas eles representam a localização dos arquivos em relação a pasta `output` e o nome final do arquivo.

Como eu utilizo o GitHub Pages para publicar o meu site, eu também adicionei um arquivo `README.md` para aparecer na descrição do repositório no Github do [meu blog](https://github.com/GiliardGodoi/GiliardGodoi.github.io).


# A falta de atualização do Pelican

Pelican como uma ferramenta, apesar de estar sendo atualizada, ela vem recebendo bem menos updates no seu repositório.
Na data de publicação desse artigo, o último *commit* em seu repositório foi em 26 de outubro de 2022.

Outro framework famoso para geração de sites estáticos, [Hugo](https://github.com/gohugoio/hugo) vem recebendo atualizações bem mais rápidas. O último commit em seu repositório é de apenas 10 horas atrás. E pelo histórico, novos *commits* ocorrem quase que diariamente no *branch* principal (não sei se isso é uma boa prática, porém é assim que é).

E esse problema fica ainda pior quando falamos de seus plugings, como vimos no caso do suporte aos *Jupyters Notebooks*.
Para citar outro exemplo, o plugin [`pelican-bootstrapify`](https://github.com/ingwinlu/pelican-bootstrapify) teve seu último commit em maio de 2018! Sim, há mais de 4 anos!

# Referências

Pelican. **Documentação Oficial**.
Disponível em: [docs.getpelican.com/en/lastest](https://docs.getpelican.com/en/latest/)

David Colton. **Adding a personal touch**. Disponível em: [davidcolton.github.io/articles/2020/03/08/new_theme_for_blog/](https://davidcolton.github.io/articles/2020/03/08/new_theme_for_blog/)

David Colton. **Building My Blog With Pelican And Python**. Disponível em: [davidcolton.github.io/articles/2020/03/04/building_my_blog/](https://davidcolton.github.io/articles/2020/03/04/building_my_blog/)
