# Instruções

Instruções para instalação, configuração de plugins e temas, e outras informações úteis para o desenvolvimento do blog.

# Instalação

Para instalar as dependências do projeto, execute o comando:

```bash
pip install "pelican[markdown] typogrify beautifulsoup4"
```

Esse comando deve ser suficiente para instalar as dependências necessárias para o funcionamento do Pelican. Caso não seja, entre em contato.

# Plugins

Os plugins do Pelican podem ser instalados via `pip` ou clonados como subdiretórios do projeto. Todos os plugins estão localizados no diretório `plugins`. A variável `PLUGIN_PATHS` informa a localização dos plugins, enquanto a variável `PLUGINS` informa quais plugins devem ser carregados.

O plugin `image-article` é utilizado para copiar as imagens das pastas dos artigos, para a pasta de saída do Pelican. Não é necessário realizar a sua instalação uma vez que ele foi desenvolvido dentro da estrutura do projeto.

O plugin `pelican-bootstrapify` é utilizado para adicionar classes do Bootstrap em elementos HTML específicos. Uma vez que esse plugin já está registrado no `.gitmodules` como um submódulo, é necessário executar o comando o seguinte comando para baixar o código fonte do plugin.

```bash
git submodule update --init --recursive
```

# Configurações

As configurações do Pelican se encontram no arquivo `pelicanconf.py`. Já o arquivo `publishconf.py` é utilizado para as configurações de publicação.

Algumas variáveis de configuração são específicas do Pelican, enquanto outras são utilizadas pelos temas. Para saber mais sobre as configurações do Pelican, consulte a [documentação oficial](https://docs.getpelican.com/en/stable/settings.html).

# Deploy GitHub Pages

Atualmente o deploy está sendo realizado de forma automática utilizando o GitHub Actions. O arquivo de configuração do GitHub Actions se encontra no diretório `.github/workflows`.

# Publicando conteúdo

Para gerar os arquivos estáticos do site, execute o seguinte comando:

```bash
pelican content -l -r
```

A flag `-l` é utilizada para ativar o modo de escuta, enquanto a flag `-r` é utilizada para regerar o site a cada alteração nos arquivos fonte.

É ainda possível alterar o arquivo de configuração utilizado para a geração dos arquivos estáticos. Para isso, utilize o seguinte comando:

```bash
pelican content -s publishconf.py
```

Note que o diretório `output` é ignorado pelo `.gitignore`, e por isso, não deve ser versionado. Isso evita que os arquivos gerados sejam enviados para o repositório. Além disso, as configurações de deploy do GitHub Actions estão configuradas para publicar o site sem a necessidade de versionar os arquivos gerados.


# Temas

Atualmente está sendo utilizado o `pelican-minimum` como tema padrão do site. O tema também está declarado como um submódulo no arquivo `.gitmodules`. Para baixar o tema, será necessário ter executado o seguinte comando:

```bash
git submodule update --init --recursive
```

O tema utilizado [`pelican-minimum`](https://github.com/GiliardGodoi/pelican-minimum) é uma versão customizada e pessoal. O tema utiliza o framework CSS [Bootstrap](https://getbootstrap.com/) (versão 5) e os ícones [Font Awesome](https://fontawesome.com/) como dependência.

A imagem da capa foi disponibilizada para uso livre por [Tom Hermans](https://unsplash.com/pt-br/@tomhermans) no [Unsplash](https://unsplash.com/pt-br/fotografias/reservar-lote-na-mesa-9BoqXzEeQqM).

## Detalhes

O ícone que aparece na guia do navegador foi criado utilizando o site [favicon.io](https://favicon.io/favicon-generator/). O ícone é uma letra `G` estilizada utilizando a fonte `Playwrite BE VLG` e a cor *Laranja Queimado* (`#FF6F3C`). Os arquivos gerados foram salvos na pasta `content/extras`. Os arquivos devem ser declarados na variável `EXTRA_PATH_METADATA` do arquivo `pelicanconf.py` indicando a origem e o destino dos arquivos.

