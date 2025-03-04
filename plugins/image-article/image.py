import os
import shutil
import logging
from pelican import signals

# Configuração do logging
logging.basicConfig(level=logging.INFO, format='[%(levelname)s] %(message)s')
logger = logging.getLogger(__name__)

def copy_images(generator):
    for article in generator.articles:
        source_dir = os.path.dirname(article.source_path)
        dest_dir = os.path.dirname(article.save_as)

        if os.path.exists(source_dir):
            for file in os.listdir(source_dir):
                if file.lower().endswith(('.png', '.jpg', '.jpeg', '.gif', '.svg')):
                    src_path = os.path.join(source_dir, file)
                    dest_path = os.path.join(generator.output_path, dest_dir, file)

                    os.makedirs(os.path.dirname(dest_path), exist_ok=True)
                    shutil.copy2(src_path, dest_path)

                    logger.info(f'Copiando imagem: {src_path} -> {dest_path}')

def register():
    signals.article_generator_finalized.connect(copy_images)
