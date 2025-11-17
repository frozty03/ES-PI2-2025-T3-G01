-- =========================================================
--
-- 1. Usuários
--
-- =========================================================

CREATE TABLE public."Users"
(
    id uuid NOT NULL,
    nome character varying(100) NOT NULL,
    email character varying(70) NOT NULL,
    telefone_celular character varying(20) NOT NULL,
    senha character varying(255) NOT NULL,
    PRIMARY KEY (id)
);

ALTER TABLE IF EXISTS public."Users"
    OWNER to root;

-- =========================================================
--
-- 2. Instituições
--
-- =========================================================

CREATE TABLE public."Instituicoes"
(
    id uuid NOT NULL,
    nome character varying(150) NOT NULL,
    PRIMARY KEY (id)
);

ALTER TABLE IF EXISTS public."Instituicoes"
    OWNER to root;

-- =========================================================
--
-- 3. Atua (Usuários x Instituições)
--
-- =========================================================

CREATE TABLE public."Atua_User_Instituicao"
(
    id_user uuid NOT NULL,
    id_instituicao uuid NOT NULL,
    PRIMARY KEY (id_user, id_instituicao),
    CONSTRAINT fk_user FOREIGN KEY (id_user)
        REFERENCES public."Users" (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
        NOT VALID,
    CONSTRAINT fk_instituicao FOREIGN KEY (id_instituicao)
        REFERENCES public."Instituicoes" (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
        NOT VALID
);

ALTER TABLE IF EXISTS public."Atua_User_Instituicao"
    OWNER to root;

-- =========================================================
--
-- 4. Cursos
--
-- =========================================================

CREATE TABLE public."Curso"
(
    id uuid NOT NULL,
    nome character varying(150) NOT NULL,
    PRIMARY KEY (id)
);

ALTER TABLE IF EXISTS public."Curso"
    OWNER to root;

-- =========================================================
--
-- 5. Oferece (Curso Instituição)
--
-- =========================================================

CREATE TABLE public."Oferece_Curso_Instituicao"
(
    id_instituicao uuid NOT NULL,
    id_curso uuid NOT NULL,
    PRIMARY KEY (id_instituicao, id_curso),
    CONSTRAINT fk_curso FOREIGN KEY (id_curso)
        REFERENCES public."Curso" (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
        NOT VALID,
    CONSTRAINT fk_instituicao FOREIGN KEY (id_instituicao)
        REFERENCES public."Instituicoes" (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
        NOT VALID
);

ALTER TABLE IF EXISTS public."Oferece_Curso_Instituicao"
    OWNER to root;

-- =========================================================
--
-- 6. Disciplinas
--
-- =========================================================

CREATE TABLE public."Disciplinas"
(
    id uuid NOT NULL,
    cod integer NOT NULL,
    nome character varying(150) NOT NULL,
    sigla character varying(10) NOT NULL,
    periodo character varying(2) NOT NULL,
    PRIMARY KEY (id),
    UNIQUE (cod)
);

ALTER TABLE IF EXISTS public."Disciplinas"
    OWNER to root;

-- =========================================================
--
-- 7. Turmas
--
-- =========================================================

CREATE TABLE public."Turmas"
(
    id uuid NOT NULL,
    cod integer NOT NULL,
    PRIMARY KEY (id),
    UNIQUE (cod)
);

ALTER TABLE IF EXISTS public."Turmas"
    OWNER to root;

-- =========================================================
--
-- 8. Alunos
--
-- =========================================================

CREATE TABLE public."Alunos"
(
    id uuid NOT NULL,
    ra character varying(8) NOT NULL,
    nome character varying(150) NOT NULL,
    PRIMARY KEY (id),
    UNIQUE (ra)
);

ALTER TABLE IF EXISTS public."Alunos"
    OWNER to root;

-- =========================================================
--
-- 9. Participação (Aluno x Turma)
--
-- =========================================================

CREATE TABLE public."Participa_Aluno_Turma"
(
    id_aluno uuid NOT NULL,
    id_turma uuid NOT NULL,
    PRIMARY KEY (id_turma, id_aluno),
    CONSTRAINT fk_aluno FOREIGN KEY (id_aluno)
        REFERENCES public."Alunos" (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
        NOT VALID,
    CONSTRAINT fk_turma FOREIGN KEY (id_turma)
        REFERENCES public."Turmas" (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
        NOT VALID
);

ALTER TABLE IF EXISTS public."Participa_Aluno_Turma"
    OWNER to root;

-- =========================================================
--
-- 10. Componentes de Nota
--
-- =========================================================

CREATE TABLE public."Componente_Nota"
(
    id uuid NOT NULL,
    nome character varying(150) NOT NULL,
    peso numeric(4, 2) NOT NULL,
    PRIMARY KEY (id)
);

ALTER TABLE IF EXISTS public."Componente_Nota"
    OWNER to root;

-- =========================================================
--
-- 11. Entidade Associativa: Notas (Aluno + Turma + Componente)
--
-- =========================================================

CREATE TABLE public."Notas_Aluno_Turma_Componente"
(
    id uuid NOT NULL,
    id_turma uuid NOT NULL,
    id_aluno uuid NOT NULL,
    id_componente uuid NOT NULL,
    valor numeric(4, 2) NOT NULL,
    PRIMARY KEY (id),
    CONSTRAINT fk_turma FOREIGN KEY (id_turma)
        REFERENCES public."Turmas" (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
        NOT VALID,
    CONSTRAINT fk_aluno FOREIGN KEY (id_aluno)
        REFERENCES public."Alunos" (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
        NOT VALID,
    CONSTRAINT fk_componente FOREIGN KEY (id_componente)
        REFERENCES public."Componente_Nota" (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
        NOT VALID
);

ALTER TABLE IF EXISTS public."Notas_Aluno_Turma_Componente"
    OWNER to root;

-- =========================================================
--
-- 12. Compõe (Disciplina x Curso)
--
-- =========================================================

CREATE TABLE public."Compoe_Disciplina_Curso"
(
    id_disciplina uuid NOT NULL,
    id_curso uuid NOT NULL,
    PRIMARY KEY (id_disciplina, id_curso),
    CONSTRAINT fk_curso FOREIGN KEY (id_curso)
        REFERENCES public."Curso" (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
        NOT VALID,
    CONSTRAINT fk_disciplina FOREIGN KEY (id_disciplina)
        REFERENCES public."Disciplinas" (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
        NOT VALID
);

ALTER TABLE IF EXISTS public."Compoe_Disciplina_Curso"
    OWNER to root;


-- Alteração

ALTER TABLE IF EXISTS public."Notas_Aluno_Turma_Componente"
    ADD CONSTRAINT nota_0_ate_10 CHECK (valor BETWEEN 0 AND 10);

-- =========================================================
--
-- 13. Cria (Turma x Disciplina)
--
-- =========================================================

CREATE TABLE public."Cria_Turmas_Disciplina"
(
    id_turma uuid NOT NULL,
    id_disciplina uuid NOT NULL,
    PRIMARY KEY (id_turma, id_disciplina),
    CONSTRAINT fk_turma FOREIGN KEY (id_turma)
        REFERENCES public."Turmas" (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
        NOT VALID,
    CONSTRAINT fk_disciplina FOREIGN KEY (id_disciplina)
        REFERENCES public."Disciplinas" (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
        NOT VALID
);

ALTER TABLE IF EXISTS public."Cria_Turmas_Disciplina"
    OWNER to root;

ALTER TABLE public."Componente_Nota"
ADD COLUMN id_disciplina uuid NOT NULL,
ADD CONSTRAINT fk_disciplina_componente FOREIGN KEY (id_disciplina)
    REFERENCES public."Disciplinas" (id)
    ON UPDATE NO ACTION
    ON DELETE NO ACTION
    NOT VALID,
ADD CONSTRAINT unq_nome_disciplina UNIQUE (id_disciplina, nome);

ALTER TABLE public."Componente_Nota"
ADD COLUMN sigla character varying(10) NOT NULL,
ADD COLUMN descricao character varying(255) NOT NULL;



CREATE TABLE IF NOT EXISTS notas_audit_log (
    id BIGSERIAL PRIMARY KEY,
    operacao VARCHAR(10) NOT NULL,
    aluno_nome VARCHAR(255) NOT NULL,
    aluno_id BIGINT,
    disciplina_nome VARCHAR(255),
    disciplina_id BIGINT,
    nota_antiga NUMERIC(5,2),
    nota_nova NUMERIC(5,2),
    usuario VARCHAR(255) NOT NULL,
    data_hora TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    mensagem TEXT NOT NULL,
    dados_completos_antigos JSONB,
    dados_completos_novos JSONB
);

CREATE INDEX IF NOT EXISTS idx_notas_audit_data_hora 
    ON notas_audit_log(data_hora DESC);

CREATE INDEX IF NOT EXISTS idx_notas_audit_aluno_id 
    ON notas_audit_log(aluno_id);

CREATE INDEX IF NOT EXISTS idx_notas_audit_disciplina_id 
    ON notas_audit_log(disciplina_id);

CREATE OR REPLACE FUNCTION auditoria_notas_trigger_func()
RETURNS TRIGGER AS $$
DECLARE
    v_aluno_nome VARCHAR(255);
    v_disciplina_nome VARCHAR(255);
    v_nota_antiga NUMERIC(5,2);
    v_nota_nova NUMERIC(5,2);
    v_mensagem TEXT;
    v_usuario VARCHAR(255);
    v_operacao VARCHAR(10);
BEGIN

    BEGIN
        v_usuario := current_setting('app.current_user', true);
        IF v_usuario IS NULL OR v_usuario = '' THEN
            v_usuario := current_user;
        END IF;
    EXCEPTION
        WHEN OTHERS THEN
            v_usuario := current_user;
    END;


    IF (TG_OP = 'DELETE') THEN
        v_operacao := 'DELETE';
        v_aluno_nome := OLD.aluno_nome;
        v_disciplina_nome := OLD.disciplina_nome;
        v_nota_antiga := OLD.nota;
        v_nota_nova := NULL;

        v_mensagem := TO_CHAR(CURRENT_TIMESTAMP, 'DD/MM/YYYY HH24:MI:SS') || 
                      ' - (Aluno ' || OLD.aluno_nome || ') - ' ||
                      'Nota ' || OLD.nota || ' excluída.';

        INSERT INTO notas_audit_log (
            operacao, aluno_nome, aluno_id, disciplina_nome, disciplina_id,
            nota_antiga, nota_nova, usuario, data_hora, mensagem,
            dados_completos_antigos, dados_completos_novos
        ) VALUES (
            v_operacao, OLD.aluno_nome, OLD.aluno_id, OLD.disciplina_nome, OLD.disciplina_id,
            v_nota_antiga, v_nota_nova, v_usuario, CURRENT_TIMESTAMP, v_mensagem,
            to_jsonb(OLD), NULL
        );

        RETURN OLD;

    ELSIF (TG_OP = 'UPDATE') THEN
        v_operacao := 'UPDATE';
        v_aluno_nome := NEW.aluno_nome;
        v_disciplina_nome := NEW.disciplina_nome;
        v_nota_antiga := OLD.nota;
        v_nota_nova := NEW.nota;

        IF OLD.nota IS DISTINCT FROM NEW.nota THEN
            v_mensagem := TO_CHAR(CURRENT_TIMESTAMP, 'DD/MM/YYYY HH24:MI:SS') || 
                          ' - (Aluno ' || NEW.aluno_nome || ') - ' ||
                          'Nota de ' || COALESCE(OLD.nota::TEXT, 'NULL') || 
                          ' para ' || COALESCE(NEW.nota::TEXT, 'NULL') || 
                          ' modificada e salva.';

            INSERT INTO notas_audit_log (
                operacao, aluno_nome, aluno_id, disciplina_nome, disciplina_id,
                nota_antiga, nota_nova, usuario, data_hora, mensagem,
                dados_completos_antigos, dados_completos_novos
            ) VALUES (
                v_operacao, NEW.aluno_nome, NEW.aluno_id, NEW.disciplina_nome, NEW.disciplina_id,
                v_nota_antiga, v_nota_nova, v_usuario, CURRENT_TIMESTAMP, v_mensagem,
                to_jsonb(OLD), to_jsonb(NEW)
            );
        END IF;

        RETURN NEW;

    ELSIF (TG_OP = 'INSERT') THEN
        v_operacao := 'INSERT';
        v_aluno_nome := NEW.aluno_nome;
        v_disciplina_nome := NEW.disciplina_nome;
        v_nota_antiga := NULL;
        v_nota_nova := NEW.nota;

        v_mensagem := TO_CHAR(CURRENT_TIMESTAMP, 'DD/MM/YYYY HH24:MI:SS') || 
                      ' - (Aluno ' || NEW.aluno_nome || ') - ' ||
                      'Nota ' || NEW.nota || ' lançada pela primeira vez e salva.';

        INSERT INTO notas_audit_log (
            operacao, aluno_nome, aluno_id, disciplina_nome, disciplina_id,
            nota_antiga, nota_nova, usuario, data_hora, mensagem,
            dados_completos_antigos, dados_completos_novos
        ) VALUES (
            v_operacao, NEW.aluno_nome, NEW.aluno_id, NEW.disciplina_nome, NEW.disciplina_id,
            v_nota_antiga, v_nota_nova, v_usuario, CURRENT_TIMESTAMP, v_mensagem,
            NULL, to_jsonb(NEW)
        );

        RETURN NEW;
    END IF;

    RETURN NULL;
END;
$$ LANGUAGE plpgsql;

-- Substitua 'notas' pelo nome real da tabela de notas
CREATE TRIGGER notas_audit_trigger
    AFTER INSERT OR UPDATE OR DELETE ON notas
    FOR EACH ROW
    EXECUTE FUNCTION auditoria_notas_trigger_func();

COMMENT ON TABLE notas_audit_log IS 
    'Tabela de auditoria para rastrear todas as operações de INSERT, UPDATE e DELETE na tabela de notas. Esta auditoria é obrigatória e não pode ser desabilitada.';

COMMENT ON COLUMN notas_audit_log.id IS 
    'Identificador único do registro de auditoria';

COMMENT ON COLUMN notas_audit_log.operacao IS 
    'Tipo de operação realizada: INSERT, UPDATE ou DELETE';

COMMENT ON COLUMN notas_audit_log.mensagem IS 
    'Mensagem formatada para exibição no painel de auditoria';

COMMENT ON COLUMN notas_audit_log.dados_completos_antigos IS 
    'Dados completos do registro antes da operação (formato JSON)';

COMMENT ON COLUMN notas_audit_log.dados_completos_novos IS 
    'Dados completos do registro após a operação (formato JSON)';


CREATE OR REPLACE FUNCTION obter_auditoria_notas(
    p_limite INT DEFAULT 100,
    p_offset INT DEFAULT 0,
    p_aluno_id BIGINT DEFAULT NULL,
    p_disciplina_id BIGINT DEFAULT NULL
)
RETURNS TABLE (
    id BIGINT,
    mensagem TEXT,
    operacao VARCHAR(10),
    aluno_nome VARCHAR(255),
    nota_antiga NUMERIC(5,2),
    nota_nova NUMERIC(5,2),
    usuario VARCHAR(255),
    data_hora TIMESTAMP
) AS $$
BEGIN
    RETURN QUERY
    SELECT 
        nal.id,
        nal.mensagem,
        nal.operacao,
        nal.aluno_nome,
        nal.nota_antiga,
        nal.nota_nova,
        nal.usuario,
        nal.data_hora
    FROM notas_audit_log nal
    WHERE 
        (p_aluno_id IS NULL OR nal.aluno_id = p_aluno_id)
        AND (p_disciplina_id IS NULL OR nal.disciplina_id = p_disciplina_id)
    ORDER BY nal.data_hora DESC
    LIMIT p_limite
    OFFSET p_offset;
END;
$$ LANGUAGE plpgsql;

CREATE OR REPLACE FUNCTION contar_auditoria_notas(
    p_aluno_id BIGINT DEFAULT NULL,
    p_disciplina_id BIGINT DEFAULT NULL
)
RETURNS BIGINT AS $$
DECLARE
    v_total BIGINT;
BEGIN
    SELECT COUNT(*)
    INTO v_total
    FROM notas_audit_log
    WHERE 
        (p_aluno_id IS NULL OR aluno_id = p_aluno_id)
        AND (p_disciplina_id IS NULL OR disciplina_id = p_disciplina_id);

    RETURN v_total;
END;
$$ LANGUAGE plpgsql;

CREATE OR REPLACE FUNCTION arquivar_auditoria_antiga(
    p_dias_retencao INT DEFAULT 365
)
RETURNS INT AS $$
DECLARE
    v_registros_arquivados INT;
BEGIN
    CREATE TABLE IF NOT EXISTS notas_audit_log_arquivo (
        LIKE notas_audit_log INCLUDING ALL
    );

    WITH registros_movidos AS (
        DELETE FROM notas_audit_log
        WHERE data_hora < CURRENT_TIMESTAMP - (p_dias_retencao || ' days')::INTERVAL
        RETURNING *
    )
    INSERT INTO notas_audit_log_arquivo
    SELECT * FROM registros_movidos;

    GET DIAGNOSTICS v_registros_arquivados = ROW_COUNT;

    RETURN v_registros_arquivados;
END;
$$ LANGUAGE plpgsql;

CREATE OR REPLACE VIEW vw_estatisticas_auditoria AS
SELECT 
    operacao,
    COUNT(*) as total_operacoes,
    COUNT(DISTINCT aluno_id) as total_alunos_afetados,
    COUNT(DISTINCT disciplina_id) as total_disciplinas_afetadas,
    COUNT(DISTINCT usuario) as total_usuarios,
    MIN(data_hora) as primeira_operacao,
    MAX(data_hora) as ultima_operacao
FROM notas_audit_log
GROUP BY operacao;

CREATE OR REPLACE VIEW vw_ultimas_alteracoes_por_aluno AS
SELECT DISTINCT ON (aluno_id, disciplina_id)
    aluno_id,
    aluno_nome,
    disciplina_id,
    disciplina_nome,
    nota_antiga,
    nota_nova,
    operacao,
    usuario,
    data_hora,
    mensagem
FROM notas_audit_log
ORDER BY aluno_id, disciplina_id, data_hora DESC;

