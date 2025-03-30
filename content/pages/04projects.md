Title: Projetos


[TOC]

## 1. Classificação de Decisões Juciais segundo Temas Repetitivos do STJ e STF

Participação como pesquisador voluntário no Projeto de Pesquisa para desenvolvimento de ferramentas baseadas em Inteligência Artifical (IA) e Aprendizado de Máquina, desenvolvido no âmbito da parceria entre o Instituto de Ciências Matemáticas e de Computação (ICMC) da Universidade de São Paulo (USP) e o Tribunal de Justiça do Estado de São Paulo (TJSP). A participação neste projeto ocorreu entre  **outubro de 2022 a agosto de 2024**.

As minhas contribuições no projeto foram:

1. Análise dos resultados dos experimentos de classificação durante o chamado '*Desafio de Maio de 2023*'. Foram testadas mais de 800 configurações de modelos de classificação, e os resultados foram consolidados e analisados utilizando a biblioteca `pandas`, e as bibliotecas `matplotlib` e `seaborn` para visualização dos resultados;
2. Treinamento de um modelo de Reconhecimento de Entidades Nomeadas (NER) para identificação de entidades em textos judiciais, utilizando a biblioteca [Spacy](https://spacy.io/) e o conjunto de dados [LeNER-Br](https://github.com/peluz/lener-br);
3. Anotação de um novo conjunto de Entidades específicas para as necessidades do projeto, utilizando a ferramenta [Inception](https://inception-project.github.io/) e treinamento de modelos baseados em [Redes Neurais Recorrentes LSTM](https://colah.github.io/posts/2015-08-Understanding-LSTMs/) e modelos *Transformers* como BERTimbau e outros modelos da biblioteca [`Hugging Face`](https://huggingface.co/) específicos para o domínio jurídico em Português Brasileiro;
4. Desenvolvimento de protótipos de interfaces gráficas para comunicação dos resultados dos diversos modelos de IA aos usuários clientes. As interfaces foram desenvolvidas utilizando a biblioteca [`streamlit`](https://streamlit.io/). Ver os artigos sobre o *LegalSum* e *LegalClass*;
5. Refinamento dos *workflows* de pré-processamento e preparação dos documentos para classificação, utilizando as bibliotecas `pandas`, `nltk`, `spacy`, `scikit-learn` e `re` (*Regular Expressions*) e outras;
6. Desenvolvimento de *scripts* para segmentação dos documentos segundo a estrutura dos acórdãos (voto do relator, relatório, fundamentação, e declaração de voto contrário) e extração de metadados dos documentos contidos no conteúdo dos acórdãos;
7. Participação em reuniões de alinhamento com os clientes do projeto, e apresentação dos resultados obtidos durante o desenvolvimento das atividades.


## 2. Operadores de cruzamento para Algoritmos Genéticos aplicados ao Problema da Árvore de Steiner em Grafos

Projeto de pesquisa desenvolvido durante o Mestrado em Informática do Programa de Pós-Graduação Profissional em Informática da Universidade Tecnológica Federal do Paraná (UTFPR), sob a orientação do Prof. Dr. Danilo Sipoli Sanches, *realizado no período de agosto de 2019 a dezembro de 2021*.

Considerando um grafo não direcionado e ponderado $G(V, E)$, onde $V$ representa o conjunto de vértices e $E$ o conjunto de arestas, e $T \in V$ um subconjunto de $V$ de vértices especiais denominados terminais. O Problema da Árvore de Steiner em Grafos (*Steiner Tree Problem in Graphs - STPG*) consiste em determinar uma árvore de custo mínimo que conecta todos os vértices de $T$. O STPG é um problema NP-difícil, e possui diversas aplicações práticas em redes de comunicação, redes de distribuição de energia, e em problemas de roteamento de veículos.

A utilização de Algoritmos Evolutivos para esse problema não é tão comum quanto se pode pensar.
A maioria dos trabalhos na literatura utiliza métodos baseados em programação inteira, métodos exatos, ou heurísticas. A proposta deste projeto foi investigar a utilização de Algoritmos Genéticos para o STPG, especificamente a adaptação de operadores baseados na partição de grafos como o [Partition Crossover (PX)](https://dl.acm.org/doi/10.1145/1569901.1570026) e o [Generalized Partition Crossover (GPX)](https://direct.mit.edu/evco/article-abstract/28/2/255/94983/A-New-Generalized-Partition-Crossover-for-the) para o STPG. Esses operadores foram originalmente propostos para o Problema do Caixeiro Viajante, e apresentaram bons resultados em comparação com operadores clássicos da literatura.

As atividades desenvolvidas durante o projeto foram:

1. Revisão bibliográfica sobre o STPG, incluindo o estudo de heurísticas clássicas e algoritmos evolutivos para o problema;
2. Estudo dos operadores de cruzamento PX, GPAX e GPX a partir dos trabalhos de [Tinós et al. (2020)](https://link.springer.com/article/10.1057/jors.1993.69), [Tinós et al. (2014)](https://dl.acm.org/doi/10.1145/2576768.2598245) e [Whitley et al. (2009)](https://dl.acm.org/doi/10.1145/1569901.1570026);
3. Implementação de um Algoritmo Genético com operadores clássicos para o STPG, seguindo a descrição das propostas de [Kapsalis, Rayward-Smith and Smith (1993)](https://link.springer.com/article/10.1057/jors.1993.69) e [Esbensen (1995)](https://doi.org/10.1002/net.3230260403);
4. Implementação de operadores para o GA baseados em uma versão randômica dos algoritmos de Prim e Kruskal, baseado na descrição de [Raidl and Julstrom (2003)](https://ieeexplore.ieee.org/document/1206445);

O repositório [github/ppgi-stpg-gpx](https://github.com/GiliardGodoi/ppgi-stpg-gpx) contém o código fonte dos operadores de cruzamento e dos experimentos conduzidos. Os resultados principais foram reportados no artigo [*A Graph-Based Crossover and Soft-Repair Operators for the Steiner Tree Problem*](https://link.springer.com/chapter/10.1007/978-3-030-91702-9_8) apresentado no BRACIS 2021.

O repositório [github/xsteiner](https://github.com/GiliardGodoi/xsteiner) contém uma refatoração do código com a inclusão de novos operadores, melhor organização dos módulos e outras mudanças.

O arquivo da dissertação pode ser encontrada no repositório da Universidade, [através desse link](https://repositorio.utfpr.edu.br/jspui/handle/1/30181).

Durante a realização desse projeto considero que foram trabalhadas as seguintes competências:

1. Estudo de algoritmos avançados e Estrutura de Dados;
2. Desenho e condução de experimentos computacionais;
3. Análise e visualização de resultados experimentais;
4. Escrita e apresentação de artigos científicos;
5. Desenvolvimento de software.

## 3. Pesquisa com Redes Corporais Sem Fio (*Wireless Body Area Networks - WBAN*)

Estágio curricular obrigatório realizado no Laboratório de Computação de Alto Desempenho (LeCAD) na Universidade Tecnológica Federal do Paraná (UTFPR), Campus de Cornélio Procópio (PR), sob a supervisão do Prof. Dr. Rogério Santos Pozza. O estágio foi realizado no período de **abril a junho de 2018**. Após esse período, as pesquisas continuaram até **dezembro de 2018** para a conclusão do trabalho de conclusão de curso.

As atividades envolveram:

1. Pesquisa na área de Redes Corporais Sem Fios (Wireless Body Area Networks - WBAN);
2. Estudo de estratégias para controle da potência de transmissão em nós sensores visando o melhor uso da energia disponível;
3. Simulação de uma rede WBAN utilizando o software Castalia;
4. Implementação de um algoritmo de controle baseado em uma simples regra probabilística;
5. Utilização de uma abordagem Cross-Layer, em que a comunicação entre camadas não adjacentes do modelo OSI é explorada;
6. As pesquisas do estágio foram estendidas para um trabalho de conclusão de cursos, um artigo apresentado em um simpósio nacional, e alguns resultados foram mencionados na tese de doutorado do orientador;
7. Os resultados mostraram que as a abordagem Cross-Layer e o controle estatístico da potência de transmissão são alternativas viáveis para reduzir o consumo energético enquanto mantém a taxa de pacotes enviados e recebidos na rede.