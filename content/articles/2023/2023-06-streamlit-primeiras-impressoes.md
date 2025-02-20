title: Streamlit: interfaces para projetos de Inteligência Artifical de um jeito fácil
summary: Este artigo é um breve relato sobre as minhas impressões utilizando o Streamlit.
date: 2023-06-26
modified: 2024-04-07
slug: streamlit-primeiras-impressoes
authors: Giliard Godoi
category: utils
tags: streamlit


[Streamlit](https://streamlit.io/) é uma biblioteca low-code para construir interfaces web para projetos de Data Science e Inteligência Artificial. 
Imagine que você quer prototipar rapidamente uma tela, para demonstrar o funcionamento de seu modelo, ou como ele poderá ser utilizado pelo seu cliente.
O Streamlit pode te ajudar a criar o protótipo de sua aplicação, demonstrando o real valor do seu projeto para possíveis [*stakeholders*](https://pt.wikipedia.org/wiki/Stakeholder).

# Facilidade de uso

Diferente de outras opções, o Streamlit presa pela facilidade do seu uso. 
O comando para instalar é:

```bash
pip install streamlit
```

> Alguns meses atrás o streamlit não estava disponível para instalar via  `conda install` . Porém, parece que agora está como segundo informações oficiais dessa [página](https://anaconda.org/conda-forge/streamlit).


Uma aplicação é definida por um *script* em Python. 
Por exemplo, para criar uma tela de boas vindas, só precisaríamos das seguintes linhas de código:

```python
import streamlit as st

'''# Boas Vindas ao mundo do Streamlit'''

nome = st.text_input('Digite o seu nome:')

st.write(f'Seja bem vindo, {nome}')
```

Digamos que esse código tenha sido salvo no arquivo `app.py`. Para executar executar a aplicação localmente, executamos o seguinte comando no terminal:
```bash
streamlit run app.py
```

Imediantamente uma aplicação é lançada no `localhost` do seu navegador.

Observer que o título de boas vindas foi mostrado na página da aplicação, e no *script* ela foi inserida como uma *string* e dentro dela, foi específicado um título utilizando uma sintaxe [Markdown](https://pt.wikipedia.org/wiki/Markdown).

De maneira geral, qualquer objeto que não seja atribuída a uma variável vai ter o mesmo comportamento.
É como se, por baixo dos panos, o Streamlit utilizasse a função `st.write`, que é responsável por entender o tipo da variável e criar uma representação adequada na tela da aplicação.

# Documentação excelente

O Streamlit possui uma [documentação](https://docs.streamlit.io/) fácil de navegar, e que apresenta as principais funcionalidades da biblioteca de um jeito intuitivo.

Por exemplo, além da função `st.write` existem outras funções especializadas para exibir algum tipo de texto.
O bloco de código abaixo lista algumas dessas funções:
```python
import streamlit as st

st.markdown("# Hello **world**!") 
st.title("Title")
st.header("Header")
st.subheader("Subheader")

st.caption("Caption")

st.code("code = 'block'")

with st.echo():
    st.write("Show as it is!")

st.text("Text")
st.latex("x + 2")
st.divider() 
```

Também existem funções especializadas para apresentar dados:
```python
import streamlit as st

st.dataframe(df)   # para data frames de uma forma geral
st.table(df)       # para tabelas estáticas
st.data_editor(df) # para data frames editáveis

st.json(my_dict)
st.metric(label="Temperature", value="70 °F", delta="1.2 °F")

```

Exibir arquivos de outras mídias: imagens, áudio e vídeos.
```python
import streamlit as st

st.image(numpy_array)
st.audio(audio_bytes)
st.video(url)
```
Consulte a [documentação](https://docs.streamlit.io/develop/api-reference/media) para conferir as possibilidades de uso dessas funções.

Também temos as funções especializadas para exibir gráficos:
```python
import streamlit as st

# Gráficos simples
st.area_chart(data_frame)
st.bar_chart(data_frame)
st.line_chart(data_frame)
st.scatter_chart(data_frame)
st.

# Especializadas para algumas bibliotecas de visualização de dados
st.pyplot(fig)
st.altair_chart(fig)
st.vega_lite_chart(fig)
st.plotly_chart(fig)
st.bokeh_chart(fig)
st.pydeck_chart(fig)
```

Também temos os *widgets* para entrada de dados:
```python
import streamlit as st

st.button('click me')
st.checkbox('label', ...)
st.toggle('label', ...)
st.radio('label', options=[...])
st.selectbox('label', options=[...])
st.multiselect('label', options=[...])
st.select_slider('label', options=[...])
st.color_picker('label', ...)
st.number_input('label', ...)
st.slider('label', ...)
st.text_input('label', ...)
st.text_area('label', ...)
```

Uma lista completa dos widgets disponíveis pode ser encontrada no seguinte [endereço](https://docs.streamlit.io/library/api-reference/widgets).

# Para usuários avançados

Caso os widgets disponíveis não sejam suficientes, é possível criar componentes customizados para a ferramenta. 
Os desenvolvedores do Streamlit já disponibilizaram alguns tutoriais que mostram como novos componentes podem ser criados.
Existe também a possibilidade de utilizar componentes desenvolvidos por terceiros, e que são disponibilizados como pacotes. 
O site da ferramente chega a listar alguns desses componentes em seu [site oficial](https://streamlit.io/components).

# Desvantagens

Como uma aplicação é definida em um *script*, qualquer intereção com um elemento da tela (botões, caixas de *inputs* para texto, cliques) todo o *script* é executado novamente. 

Portanto, esse é um princípio que devemos sempre ter em mente:
> Em qualquer interação com a tela, todo o *script* é executado novamente!

Caso não tomemos alguns cuidados, a nossa aplicação pode ficar lenta, e ter o efeito contrário de nosso objetivo inicial, que era mostrar o real valor do nosso modelo de IA.

Para lidar com esse problema podemos lançar mão de algumas boas práticas e recursos oferecidos pelo próprio Streamlit:

1. Utilizar os recursos de *caching* ([ver documentação](https://docs.streamlit.io/library/advanced-features/caching)) nas operações de leitura de dados, estabelecer conexões com banco de dados, ou subir um modelo de predição.
2. Comportamentos estranhos devido a constante atualização do estado (valores) das variáveis e componentes. (Veja [essa postagem](https://docs.streamlit.io/library/advanced-features/button-behavior-and-examples) para entender mais sobre esse caso).

O desenvolvimento do Streamlit é frenético e em poucos meses a API da biblioteca pode mudar significativamente.
Se por um lado isso permite entregar novas funcionalidades de forma rápida, por outro, aplicativos podem ficar rapidamente desatualizados e simplesmente quebrarem (isto é, não rodar mais).

Uma convensão adotada é adicionar o termo `experimental` em algumas funções, para indicar que elas são disponibilizadas em caráter de testes e que elas podem ser alteradas ou removidas entre uma versão e outra. 
Esse fato detalhado [nessa seção](https://docs.streamlit.io/library/advanced-features/prerelease) da documentação.


# Bônus: deploy o seu protótipo na nuvem

A empresa que mantém o projeto do Streamlit também oferece o *Streamlit Community* que permite fazer o deploy de aplicações na nuvem. 

O código da aplicação precisa estar em um repositório público do GitHub e com a devida atuorização para que o Streamlit Community se conecte a sua conta no GitHub. Seguindo passo-a-passo deste [tutorial](https://docs.streamlit.io/streamlit-community-cloud/get-started) é bem fácil realizar essas configurações.

A versão gratuita do *Streamlit Community* permite aplicações que requeiram até 1Gb de memória, o que eu acho pouco, se pensarmos que alguns modelos de Deep Learning podem ser grandes. 
Além disso, a versão gratuita permite apenas um app privado, e promete uma quantidade ilimitada de apps públicos.

Recentemente eu fiz um teste com o Streamlit Community, com uma aplicação que consulta a API de documentos do (famoso) [SAPL](https://sapl.santoantoniodaplatina.pr.leg.br/) e retorna um relatório com documentos cadastrados em determinada semana. 
O repositório dessa aplicação pode ser encontrado [nesse link](https://github.com/giliardgodoi/streamlit-sapl/blob/main/01_INICIAL.py).

Existe uma grande variedade de outros exemplos de aplicações desenvolvidas com streamlit, e para citar algumas:

1. [Monte Carlo simulations with Streamlit](https://blog.streamlit.io/monte-carlo-simulations-with-streamlit/)
2. [Semantic search, Part 1: Implementing cosine similarity (streamlit.io)](https://blog.streamlit.io/semantic-search-part-1-implementing-cosine-similarity/)
3. [ScienceIO manages billions of rows of training data with Streamlit](https://blog.streamlit.io/scienceio-manages-billions-of-rows-of-training-data-with-streamlit/)
4. [ESG reporting with Streamlit](https://blog.streamlit.io/esg-reporting-with-streamlit/)