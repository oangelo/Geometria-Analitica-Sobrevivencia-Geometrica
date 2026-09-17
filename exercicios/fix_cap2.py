#!/usr/bin/env python3
"""Fix all exercise files in Capítulo II - Produto Interno no R².

Issues to fix:
1. Add missing hint-details blocks
2. Fix decimal notation (dots -> commas in math)
3. Improve hints that are too specific (give formula instead of concept)
4. Fix mathematical error in relacao-com-ponto-medio.html
5. Fix inconsistent decimal notation across files
"""

import os
import re

BASE = "/home/oangelo/github/Geometria-Analitica-Sobrevivencia-Geometrica/worktrees/exercicios/exercicios/capitulo-ii-produto-interno-no-r2"

# Files that need hint-details added (no hint block at all)
HINT_ADDITIONS = {
    # Topic 1
    "1-produto-escalar-de-dois-vetores/relacao-com-ponto-medio.html":
        "Para verificar se o produto escalar é nulo, lembre-se de que isso indica perpendicularidade. Calcule os vetores envolvidos e aplique a definição de produto escalar.",
    "1-produto-escalar-de-dois-vetores/expressao-com-parametros.html":
        "Desenvolva o produto escalar algebricamente e observe o que acontece com a variável $t$ após a simplificação.",
    "1-produto-escalar-de-dois-vetores/integracao-de-multiplos-conceitos.html":
        "Este problema envolve um sistema de duas equações lineares. Use a técnica de eliminação ou substituição que já dominamos.",

    # Topic 2
    "2-modulo-de-um-vetor/rota-de-fuga-otimizada.html":
        "Pense geometricamente: se queremos reduzir o módulo pela metade mantendo a direção, o vetor de ajuste deve ser proporcional ao vetor original.",
    "2-modulo-de-um-vetor/balanceamento-de-forcas.html":  # NOTE: This exercise has no solution
        "Verifique se as condições do problema são compatíveis entre si. Às vezes, a resposta mais valiosa é descobrir que um cenário é impossível.",
    "2-modulo-de-um-vetor/triangulacao-de-coordenadas.html":
        "Use a relação entre os vetores para expressar $\\vec{BC}$ em termos de $\\vec{AB}$ e $\\vec{AC}$. A expressão pedida pode se simplificar de forma surpreendente.",

    # Topic 3
    "3-distancia-entre-dois-pontos/rede-de-comunicacao-otimizada.html":
        "Este é um problema de otimização: conectar todos os pontos com o menor comprimento total. Comece calculando todas as distâncias possíveis e depois escolha as menores sem formar ciclos.",
    "3-distancia-entre-dois-pontos/encapsulamento-de-zona-contaminada.html":
        "Nem todos os pontos estarão nos vértices do polígono. Primeiro determine qual subconjunto de pontos forma o perímetro exterior — o fecho convexo.",
    "3-distancia-entre-dois-pontos/reconstrucao-de-mapa-danificado.html":
        "O circuncentro de um triângulo é o ponto equidistante dos três vértices. Compare as distâncias dos candidatos até este ponto.",

    # Topic 5
    "5-angulo-de-dois-vetores/bombardeio-de-precisao.html":
        "O drone segue uma trajetória parametrizada. Expresse a posição de lançamento em função de um parâmetro $t$ e use a condição do ângulo para determinar $t$.",

    # Topic 6
    "6-area-de-triangulo-e-alinhamento-de-tres-pontos/otimizacao-de-rota-segura.html":
        "Com três pontos, existem apenas duas rotas cíclicas distintas. Calcule a distância total de cada uma e compare.",
    "6-area-de-triangulo-e-alinhamento-de-tres-pontos/calibracao-do-escudo-defensor.html":
        "Para o item (a), use a fórmula da área do triângulo com vetores. Para o (b), verifique se a área do triângulo alternativo é diferente de zero.",
    "6-area-de-triangulo-e-alinhamento-de-tres-pontos/perimetro-de-exclusao-toxica.html":
        "Verifique primeiro se os lados opostos são paralelos — isso revela a natureza do quadrilátero e simplifica todos os cálculos subsequentes.",
}

def add_hint_to_file(filepath, hint_text):
    """Add a hint-details block before the solution details block."""
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()

    # Check if hint-details already exists
    if 'class="hint-details"' in content:
        print(f"  SKIP (already has hint): {os.path.basename(filepath)}")
        return False

    # Find where to insert: before <details> with "ACESSO NÍVEL"
    marker = '<details>\n<summary>ACESSO NÍVEL'
    if marker not in content:
        # Try with different whitespace
        marker_pattern = r'<details>\s*\n\s*<summary>ACESSO NÍVEL'
        match = re.search(marker_pattern, content)
        if match:
            marker = match.group(0)
        else:
            print(f"  WARN (can't find marker): {os.path.basename(filepath)}")
            return False

    hint_block = f'''<details class="hint-details">
<summary>DICA DE SOBREVIVÊNCIA</summary>
<div class="hint">
<p>{hint_text}</p>
</div>
</details>
'''

    content = content.replace(marker, hint_block + marker)

    with open(filepath, 'w', encoding='utf-8') as f:
        f.write(content)
    print(f"  FIXED (added hint): {os.path.basename(filepath)}")
    return True


def fix_decimal_in_math(filepath):
    """Fix decimal points (dots) to commas in math expressions, following Brazilian convention.
    
    Only fix decimals like 5.5, 3.14, etc. — NOT dots in commands like \\sqrt or LaTeX.
    """
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()

    original = content

    # Fix decimals in math mode: patterns like "5.5", "3.14", "0.63" etc.
    # But NOT in LaTeX commands (\\sqrt{2.0} should be kept if it's inside text)
    # Strategy: replace digit.digit that's NOT preceded by a backslash command

    # In $...$ math blocks, replace dot with comma for decimals
    # Match: number.number inside $ delimiters
    def fix_math_decimals(match):
        block = match.group(0)
        # Replace decimal dots (digit.digit) with comma notation
        # But not dots that are part of LaTeX commands
        block = re.sub(r'(\d)\.(\d)', r'\1{,}\2', block)
        return block

    # Fix within $$...$$ blocks
    content = re.sub(r'\$\$[^$]+\$\$', fix_math_decimals, content, flags=re.DOTALL)
    # Fix within $...$ inline blocks (non-greedy, single line)
    content = re.sub(r'\$[^$]+\$', fix_math_decimals, content)

    # Also fix in formula divs that use align/cases without $$ delimiters
    # These are inside <div class="formula">...</div>
    def fix_formula_block(match):
        block = match.group(0)
        block = re.sub(r'(\d)\.(\d)', r'\1{,}\2', block)
        return block

    content = re.sub(r'<div class="formula">.*?</div>', fix_formula_block, content, flags=re.DOTALL)

    if content != original:
        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(content)
        print(f"  FIXED (decimals): {os.path.basename(filepath)}")
        return True
    return False


def fix_relacao_com_ponto_medio(filepath):
    """Fix the mathematical error in relacao-com-ponto-medio.html.
    
    The exercise claims AM.BC = 0 but the calculation shows AM.BC = 2.
    We need to fix the exercise so the claim is true, or change the exercise.
    Best approach: change the exercise to NOT claim it's zero, but to ASK if it's zero.
    """
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()

    # Replace the problematic exercise text
    old_text = 'demonstre que $\\overrightarrow{AM} \\cdot \\overrightarrow{BC} = 0$ e explique o significado geométrico desta relação para o posicionamento ótimo.'
    new_text = 'calcule o produto escalar $\\overrightarrow{AM} \\cdot \\overrightarrow{BC}$ e analise o resultado: o valor obtido indica que o ponto $M$ está sobre a mediatriz de $\\overline{BC}$ em relação a $A$? O que isso revela sobre o posicionamento do posto avançado?'

    if old_text in content:
        content = content.replace(old_text, new_text)

    # Also update the solution steps to not claim contradiction
    old_step = 'Observe que o resultado não é zero, o que contradiz a afirmação. Na verdade, $\\overrightarrow{AM} \\cdot \\overrightarrow{BC} = 2$'
    new_step = 'Observe que $\\overrightarrow{AM} \\cdot \\overrightarrow{BC} = 2 \\neq 0$, o que significa que $\\overrightarrow{AM}$ não é perpendicular a $\\overrightarrow{BC}$'

    content = content.replace(old_step, new_step)

    # Update reflection
    old_refl = 'A afirmação $\\overrightarrow{AM} \\cdot \\overrightarrow{BC} = 0$ seria verdadeira se $A$ estivesse sobre a mediatriz do segmento $\\overline{BC}$, o que significaria que $A$ estaria equidistante de $B$ e $C$. No entanto, o cálculo mostra que $\\overrightarrow{AM} \\cdot \\overrightarrow{BC} = 2$, o que indica que os pontos não estão nessa configuração especial. Para fins de sobrevivência, isto significa que o posto avançado não pode ser equidistante dos três assentamentos simultaneamente com a configuração atual, e um compromisso terá que ser feito no planejamento estratégico.'
    new_refl = 'O produto escalar $\\overrightarrow{AM} \\cdot \\overrightarrow{BC} = 2$ revela que a mediana $\\overrightarrow{AM}$ não é perpendicular ao lado $\\overline{BC}$. Geometricamente, isso significa que o ponto $A$ não está sobre a mediatriz de $\\overline{BC}$. Para fins de sobrevivência, isto indica que o abrigo $A$ não está equidistante de $B$ e $C$, e o posto avançado em $M$ não otimiza simultaneamente a proximidade com todos os assentamentos — um compromisso logístico inevitável na Zona Devastada.'

    content = content.replace(old_refl, new_refl)

    # Update the title
    content = content.replace(
        '<h3>RELAÇÃO COM PONTO MÉDIO</h3>',
        '<h3>PRODUTO ESCALAR E PONTO MÉDIO</h3>'
    )

    with open(filepath, 'w', encoding='utf-8') as f:
        f.write(content)
    print(f"  FIXED (math error): {os.path.basename(filepath)}")
    return True


def improve_too_specific_hints(filepath):
    """Improve hints that just repeat the formula instead of guiding toward the concept."""
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()

    original = content

    # Fix hints that are too formulaic
    hint_replacements = {
        # Topic 1
        'Aplique diretamente a fórmula do produto escalar: $\\vec{a} \\cdot \\vec{b} = a_1b_1 + a_2b_2$, substituindo os valores correspondentes.':
            'O produto escalar combina as componentes correspondentes de dois vetores. Pense: quais componentes se multiplicam com quais?',

        'A propriedade comutativa afirma que $\\vec{p} \\cdot \\vec{q} = \\vec{q} \\cdot \\vec{p}$. Calcule ambos os lados separadamente e compare.':
            'Calcule os dois produtos separadamente e compare os resultados. A ordem dos fatores altera o produto escalar?',

        'Primeiro calcule $\\vec{s} + \\vec{t}$, depois multiplique pelo vetor $\\vec{r}$. Compare com a soma dos produtos escalares individuais.':
            'Experimente calcular de duas formas: primeiro somando os vetores e depois fazendo o produto escalar, ou primeiro fazendo os produtos e depois somando. Os resultados coincidem?',

        'Primeiro calcule $k\\vec{d}$, depois o produto escalar com $\\vec{f}$. Compare com o produto escalar $\\vec{d} \\cdot \\vec{f}$ multiplicado por $k$.':
            'Você pode aplicar o escalar primeiro ao vetor e depois calcular o produto escalar, ou calcular o produto escalar primeiro e multiplicar pelo escalar depois. Ambos os caminhos levam ao mesmo resultado?',

        'Primeiro determine os vetores $\\overrightarrow{AB}$ e $\\overrightarrow{AC}$ a partir dos pontos dados, depois aplique a fórmula do produto escalar.':
            'Para usar o produto escalar com pontos, primeiro converta-os em vetores. Depois aplique a definição que já conhecemos.',

        # Topic 2
        'Aplique a fórmula do módulo $|\\vec{v}| = \\sqrt{v_x^2 + v_y^2}$ substituindo os valores das componentes do vetor.':
            'O módulo de um vetor mede seu "comprimento". Use a definição de produto escalar do vetor consigo mesmo para encontrá-lo.',

        'Compare os módulos dos dois vetores para determinar qual representa a maior intensidade total.':
            'Para comparar intensidades, precisamos de uma medida única para cada vetor. Qual propriedade do vetor captura sua "força total"?',

        'Primeiro encontre o vetor $\\overrightarrow{AB}$ subtraindo as coordenadas, depois calcule seu módulo.':
            'O comprimento de um segmento entre dois pontos pode ser obtido convertendo os pontos em vetor e depois calculando o módulo desse vetor.',

        'Use a propriedade $|k\\vec{v}| = |k||\\vec{v}|$ para calcular o módulo do vetor escalado sem precisar calcular o novo vetor explicitamente.':
            'Quando multiplicamos um vetor por um escalar, como isso afeta seu comprimento? Pense na relação entre o fator de escala e o módulo.',

        'Use a relação entre os módulos do vetor original e do vetor escalado para encontrar o fator de escala necessário.':
            'Se você conhece o módulo original e quer um módulo específico, que fator de escala é necessário? Pense na relação $|k\\vec{v}| = |k| \\cdot |\\vec{v}|$.',

        'Esta é uma aplicação da desigualdade triangular, que afirma que $|\\vec{a} + \\vec{b}| \\leq |\\vec{a}| + |\\vec{b}|$, com igualdade apenas quando os vetores têm a mesma direção.':
            'A soma de dois vetores pode ter módulo igual à soma dos módulos? Quando isso acontece e quando não acontece?',

        'Um vetor unitário mantém a direção do vetor original, mas tem módulo igual a 1.':
            'Para transformar um vetor em unitário, mantenha sua direção mas ajuste seu comprimento para 1. Que operação faz isso?',

        'A força resultante é a soma dos três vetores.':
            'Quando várias forças atuam simultaneamente, a força total é a soma vetorial. Calcule a soma e depois determine seu módulo.',

        # Topic 3
        'Use a fórmula da distância entre dois pontos: $d(A,B) = \\sqrt{(x_2 - x_1)^2 + (y_2 - y_1)^2}$. Substitua as coordenadas e calcule o resultado.':
            'A distância entre dois pontos é o módulo do vetor que vai de um ponto ao outro. Primeiro construa o vetor, depois calcule seu módulo.',

        'Compare a distância entre o explorador e a torre de comunicação com o alcance máximo do rádio. Se a distância for menor ou igual ao alcance, a comunicação será possível.':
            'Calcule a distância do explorador até a torre e compare com o alcance do rádio. A comunicação depende de o explorador estar dentro do raio de alcance.',

        'Calcule a distância entre cada par de pontos (AB, BC e CA) e some os resultados para obter o perímetro do triângulo.':
            'O perímetro é a soma dos comprimentos de todos os lados. Calcule a distância de cada par de vértices separadamente.',

        'Calcule a distância entre o ponto P e o centro C da zona de radiação. Compare essa distância com o raio da área contaminada.':
            'Um ponto está dentro ou fora de uma zona circular dependendo de sua distância ao centro. Compare essa distância com o raio da zona.',

        'Calcule a distância entre o ponto M e cada um dos quatro sensores, então identifique o sensor com a menor distância.':
            'Para identificar o sensor mais próximo, calcule a distância de M até cada um deles e compare os valores.',

        'Use a fórmula da área do triângulo com determinantes. Escolha um vértice como referência e calcule a área usando os vetores desse vértice para os outros dois.':
            'Escolha um vértice como origem e construa dois vetores até os outros vértices. A área do triângulo está relacionada ao produto vetorial desses vetores.',

        'Você pode calcular a área do triângulo usando a fórmula da área baseada nas coordenadas dos vértices.':
            'A área de um triângulo pode ser calculada a partir das coordenadas de seus vértices usando a fórmula envolvendo determinantes.',

        'Parametrize as posições dos veículos em função do tempo e encontre o tempo que minimiza a função de distância entre eles.':
            'Expresse as posições dos dois veículos como funções do tempo. A distância mínima ocorre quando a derivada da função de distância se anula.',

        'Para cada estação, considere a equação de uma circunferência centrada na estação com raio igual à distância detectada. A interseção dessas três circunferências dará a posição do sinal.':
            'Cada distância define uma circunferência ao redor da estação. A posição do sinal é o ponto onde as três circunferências se intersectam.',

        # Topic 4
        'Verifique se um vetor é múltiplo do outro, ou compare as razões entre suas componentes correspondentes.':
            'Dois vetores são paralelos quando apontam na mesma direção (ou opostas). Verifique se existe um escalar que transforma um no outro.',

        'Calcule o produto escalar $\\vec{a} \\cdot \\vec{b}$. Se ele for igual a zero, os vetores são ortogonais.':
            'Dois vetores são perpendiculares quando seu produto escalar é zero. Calcule o produto escalar e analise o resultado.',

        # Topic 5
        'Como os túneis partem do mesmo ponto, você só precisa calcular o ângulo entre os vetores diretores. Utilize diretamente a fórmula do cosseno do ângulo entre vetores.':
            'O ângulo entre os túneis é o ângulo entre seus vetores diretores. Use a relação entre produto escalar e cosseno do ângulo.',

        'Primeiro determine os vetores $\\vec{AB}$ e $\\vec{AC}$ subtraindo as coordenadas. Depois calcule o produto escalar e os módulos para usar na fórmula do cosseno do ângulo.':
            'Construa os vetores $\\vec{AB}$ e $\\vec{AC}$ a partir dos pontos. O ângulo entre as rotas pode ser obtido pela relação entre produto escalar e módulos.',

        'Você precisará calcular três ângulos diferentes (entre AD-BD, BD-CD e CD-AD). Para cada par, calcule os vetores, seus produtos escalares e módulos.':
            'Para cada par de vetores, use a relação entre produto escalar e ângulo. Comece calculando os três vetores a partir do ponto D.',

        'Utilizar o fato de que o cosseno do ângulo entre os vetores é conhecido. Note que existem duas soluções possíveis.':
            'Você conhece o ângulo e o módulo de um dos vetores. Monte um sistema de equações usando o produto escalar e o módulo.',

        'Aplique diretamente a fórmula do cosseno do ângulo entre vetores. Lembre-se que para vetores no formato $(a,b)$, o produto escalar é $a_1b_1 + a_2b_2$.':
            'Calcule o produto escalar e os módulos dos dois vetores. O ângulo entre eles aparece naturalmente na fórmula do cosseno.',

        'Use a fórmula do cosseno do ângulo entre vetores "ao contrário". Você conhece o ângulo e precisa encontrar o vetor, então estabeleça um sistema usando o produto escalar.':
            'Monte um sistema com duas equações: uma do produto escalar (usando o ângulo) e outra do módulo. Resolva para encontrar as coordenadas.',

        'Lembre-se que ao girar um vetor (x,y) em θ radianos no sentido anti-horário, obtemos (x·cos(θ) - y·sen(θ), x·sen(θ) + y·cos(θ)).' :
            'A rotação de um vetor preserva seu módulo mas muda sua direção. Use as fórmulas de rotação com seno e cosseno.',

        'O ângulo em A é formado pelos vetores $\\vec{AO}$ e $\\vec{AB}$. Organize as equações usando o teorema dos cossenos para triângulos.':
            'O ângulo no vértice A é o ângulo entre os vetores $\\vec{AO}$ e $\\vec{AB}$. Combine a condição do ângulo com as restrições de comprimento.',

        'Para calcular o ângulo no vértice B, você precisa encontrar o ângulo entre os vetores $\\vec{BA}$ e $\\vec{BC}$. Lembre-se que aqui B é a origem dos vetores.':
            'Os vetores no vértice B apontam de B para os outros vértices. Calcule o ângulo entre eles usando produto escalar e módulos.',

        # Topic 6
        'Utilize a fórmula da área do triângulo com determinantes. Escolha um vértice como referência e calcule a área usando os vetores desse vértice para os outros dois.':
            'Escolha um vértice como origem e construa dois vetores até os outros vértices. A área do triângulo está relacionada ao produto vetorial desses dois vetores.',

        'Pontos alinhados criam zonas vulneráveis na defesa. Use o teste de colinearidade com determinantes ou compare as direções dos vetores para verificar o alinhamento.':
            'Três pontos são colineares quando os vetores entre eles são paralelos. Verifique se os vetores são proporcionais.',

        'Expresse a área do triângulo em função de h, usando a fórmula da área com vetores, e então resolva a equação resultante.':
            'Use a fórmula da área com as coordenadas dos vértices. A variável $h$ aparecerá na expressão — iguale à área desejada e resolva.',

        'Divida o quadrilátero em dois triângulos e calcule a área total como a soma das áreas individuais.':
            'Um quadrilátero pode ser dividido em dois triângulos por uma diagonal. Calcule a área de cada triângulo separadamente e some.',

        'O ponto D está na mesma linha horizontal que A, então sua coordenada y é igual à de A.':
            'Como D está na mesma linha horizontal que A, eles compartilham a mesma coordenada $y$. Use a condição de área para encontrar a coordenada $x$.',

        'Para verificar se três pontos são colineares, calcule os vetores entre dois pares de pontos e verifique se um é múltiplo escalar do outro.':
            'Se os vetores entre os pontos são proporcionais (paralelos), os pontos estão alinhados. Compare as razões entre as componentes.',

        'Se B está no eixo x e C no eixo y, então B(b, 0) e C(0, c). Use o teorema de que a área máxima ocorre quando o triângulo é isósceles.':
            'Com os vértices nos eixos, a área depende do produto das coordenadas. Dado um perímetro fixo, maximize a área explorando a simetria.',

        'Um quadrilátero é um paralelogramo se e somente se seus lados opostos são paralelos.':
            'Verifique se os vetores dos lados opostos são iguais — isso caracteriza um paralelogramo.',
    }

    for old_hint, new_hint in hint_replacements.items():
        if old_hint in content:
            content = content.replace(old_hint, new_hint)

    if content != original:
        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(content)
        print(f"  FIXED (hint improved): {os.path.basename(filepath)}")
        return True
    return False


def main():
    """Process all exercise files in Capítulo II."""
    topics = [
        "1-produto-escalar-de-dois-vetores",
        "2-modulo-de-um-vetor",
        "3-distancia-entre-dois-pontos",
        "4-paralelismo-e-ortogonalidade",
        "5-angulo-de-dois-vetores",
        "6-area-de-triangulo-e-alinhamento-de-tres-pontos",
    ]

    total_fixed = 0

    for topic in topics:
        topic_dir = os.path.join(BASE, topic)
        if not os.path.isdir(topic_dir):
            print(f"SKIP (not found): {topic}")
            continue

        print(f"\n=== {topic} ===")
        files = sorted([f for f in os.listdir(topic_dir) if f.endswith('.html')])

        for fname in files:
            filepath = os.path.join(topic_dir, fname)
            relpath = f"{topic}/{fname}"

            # 1. Add missing hints
            if relpath in HINT_ADDITIONS:
                if add_hint_to_file(filepath, HINT_ADDITIONS[relpath]):
                    total_fixed += 1

            # 2. Fix decimal notation
            if fix_decimal_in_math(filepath):
                total_fixed += 1

            # 3. Improve too-specific hints
            if improve_too_specific_hints(filepath):
                total_fixed += 1

        # Special fix for relacao-com-ponto-medio.html
        special_file = os.path.join(topic_dir, "relacao-com-ponto-medio.html")
        if os.path.exists(special_file):
            if fix_relacao_com_ponto_medio(special_file):
                total_fixed += 1

    print(f"\n=== TOTAL FIXES: {total_fixed} ===")


if __name__ == "__main__":
    main()
