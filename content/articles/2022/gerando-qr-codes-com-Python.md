Title: Gerando QR code com Python
Slug: gerando-qr-code-python
Date: 2022-09-27
Category: programming-skills
Tags: qrcode
Author: Giliard Godoi
Summary: Customizando a geração de QR codes

# Criando QR codes com Python

Por esses dias eu queria produzir um QR code para um link do *site* da Câmara de Vereadores de Santo Antônio da Platina - PR.

A maioria dos geradores disponíveis na *internet* produzem imagens padrões, e seria interessante customizar esse QR code com as cores dominantes do *site* da instituição.

Como bom programador Python eu utilizei uma biblioteca chamada `qrcode`. Ela está disponível no PyPl ([link](https://pypi.org/project/qrcode/)) e também nesse repositório: [github.com/lincolnloop/python-qrcode](https://github.com/lincolnloop/python-qrcode).



## Como funciona os QR codes

Eu tentei encontrar algum artigo didático sobre a geração de QR code e como eles funcionam, porém não encontrei uma resposta satisfatória.

Porém, quis o destino (ou o algortimo do Twitter) que eu esbarrasse com essa *thread* que faz uma introdução bem legal e com várias imagens ilustrativas.

Seria interessante dar uma olhada nessa *thread* antes de continuar lendo essa postagem.

<script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>
<blockquote class="twitter-tweet" data-lang="en" data-dnt="true" data-theme="light">
    <p lang="en" dir="ltr">Ever wondered how a QR code works? <br>No, me neither but it&#39;s low-key fascinating.
    <br><br>(Warning, there is some extremely nerdy s*** here.👇 )
    <a href="https://t.co/SgQJVvhu0q">pic.twitter.com/SgQJVvhu0q</a> </p>&mdash; Dan Hollick 🇿🇦 (@DanHollick)
        <a href="https://twitter.com/DanHollick/status/1570040185500626947?ref_src=twsrc%5Etfw">September 14, 2022</a>
</blockquote>


Outra referência interessante é esse artigo da empresa responsável pela criação do QR code, Denso Wave, contando um pouco da história da criação do QR code.

> [QR code: development history](https://www.denso-wave.com/en/technology/vol1.html)

## Instalação

Para instalar a biblioteca segui as instruções apresentadas no repositório. A adição do comando `[pil]` força a instalação da biblioteca [Pillow](https://pypi.org/project/Pillow/), responsável por gerar e trabalhar com alguns formatos de imagens (`.png` por exemplo).


```python
! pip install qrcode[pil]
```


## Gerando QR Codes

O meu objetivo é produzir um QR code que direcione uma pessoa até a página *web* em que está disponível a pauta das reuniões da Câmara Municipal.

Então, a *url* que eu vou codificar é a seguinte:


```python
url = "https://sapl.santoantoniodaplatina.pr.leg.br/sessao/pauta-sessao"
```

Nesse tutorial vamos explorar a criação das imagens através da classe `QRCode`, que fornece opções algumas opções avançadas.

O código abaixo apresenta uma forma de utilizar a classe `QRCode`, alguns parâmertos dela, e as funções necessárias para produzir um QR code.



```python
import qrcode

qr = qrcode.QRCode(
    version=4, # está relacionado ao tamanho e quantidade de informações que o QR Code pode codificar
    error_correction=qrcode.constants.ERROR_CORRECT_L, # Robustez e correção de erros de leitura
    box_size=7, # influencia no tamanho da imagem
    border=4, # borda da imagem até o início do QR Code
)

qr.add_data(url) # adiciona dados para serem codificados

qr.make(fit=True) # se o parâmetro `fit` está marcado como True
# a versão do QR code pode ser alterada para suportar a codificação de uma
# quantidade maior de informações. Faça o seguinte teste: inicie o objeto `qr`
# com o parâmetro `version=1` e o parâmetro `fit` na função `make` como False.
# É esperado que uma exceção seja gerada nessas condições.

img = qr.make_image()
# esse método possui os seguintes valores padrões
# img = qr.make_image(fill_color="black", back_color="white")

print(type(img))
img
```

    <class 'qrcode.image.pil.PilImage'>



![png]({static}/images/gerando-qr-codes-com-Python_files/gerando-qr-codes-com-Python_9_1.png)




Observe que alterando o parâmetro `error_correction` para `qrcode.constants.ERROR_CORRECT_H`altera-se o padrão da imagem. Isso significa também que existe uma maior redundância na codificação de informações que torna o QR code mais robusto a danos ou obstruções que impeçam a leitura dos dados codificados.


```python
qr = qrcode.QRCode(
    version=4,
    error_correction=qrcode.constants.ERROR_CORRECT_H,
    box_size=7,
    border=4,
)

qr.add_data(url)
qr.make(fit=True)
img = qr.make_image()

print(type(img))

img
```

    <class 'qrcode.image.pil.PilImage'>






![png]({static}/images/gerando-qr-codes-com-Python_files/gerando-qr-codes-com-Python_11_1.png)




### Customização

`qrcodes` oferece possibilidade de customizar as cores do QR code com a máscara `SolidFillColorMask`, ou opções de gradiente, além de inserir imagens no *background*.

Também é possível escolher entre diferentes estilos de formas e desenhos para o QR code.


```python
# factory para gerar uma imagem que poderá ser transformada em .png e jpeg
from qrcode.image.styledpil import StyledPilImage

# customização de cores, gradientes, e imagem no background
from qrcode.image.styles.colormasks import (SolidFillColorMask,
                                            RadialGradiantColorMask,
                                            SquareGradiantColorMask,
                                            HorizontalGradiantColorMask,
                                            VerticalGradiantColorMask,
                                            ImageColorMask)

# customização sobre a forma dos traços
from qrcode.image.styles.moduledrawers import (RoundedModuleDrawer,
                                               VerticalBarsDrawer,
                                               HorizontalBarsDrawer,
                                               GappedSquareModuleDrawer,
                                               CircleModuleDrawer)

# definindo um tom de azul para a cor do QR code
custom_blue_color = SolidFillColorMask(front_color=(0, 48, 107))
```

Para saber como instânciar essas classes que oferecem diferentes opções, dê um `help`.


```python
# help(RadialGradiantColorMask)
# help(SquareGradiantColorMask)
# help(HorizontalGradiantColorMask)
# help(VerticalGradiantColorMask)
```

#### RoundedModuleDrawer


```python
qr = qrcode.QRCode(error_correction=qrcode.constants.ERROR_CORRECT_L,
                   box_size=10,
                   border=4)

qr.add_data(url)

qr.make_image(image_factory = StyledPilImage,
              module_drawer = RoundedModuleDrawer(),
              color_mask = custom_blue_color )
```





![png]({static}/images/gerando-qr-codes-com-Python_files/gerando-qr-codes-com-Python_17_0.png)




#### CircleModuleDrawer


```python
qr.make_image(image_factory = StyledPilImage,
              module_drawer = CircleModuleDrawer(),
              color_mask = custom_blue_color)
```





![png]({static}/images/gerando-qr-codes-com-Python_files/gerando-qr-codes-com-Python_19_0.png)




#### GappedSquareModuleDrawer


```python
qr.make_image(image_factory = StyledPilImage,
              module_drawer = GappedSquareModuleDrawer(),
              color_mask = custom_blue_color )
```





![png]({static}/images/gerando-qr-codes-com-Python_files/gerando-qr-codes-com-Python_21_0.png)




#### HorizontalBarsDrawer


```python
qr.make_image(image_factory = StyledPilImage,
              module_drawer = HorizontalBarsDrawer(),
              color_mask = custom_blue_color)
```





![png]({static}/images/gerando-qr-codes-com-Python_files/gerando-qr-codes-com-Python_23_0.png)




#### VerticalBarsDrawer


```python
qr.make_image(image_factory = StyledPilImage,
              module_drawer = VerticalBarsDrawer(),
              color_mask = custom_blue_color )
```





![png]({static}/images/gerando-qr-codes-com-Python_files/gerando-qr-codes-com-Python_25_0.png)



